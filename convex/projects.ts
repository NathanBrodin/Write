import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const project = await ctx.db.insert("projects", {
      title: args.title,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return project;
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingProject = await ctx.db.get(id);

    if (!existingProject) {
      throw new Error("Not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Not authorized");
    }

    const document = await ctx.db.patch(id, {
      ...rest,
    });

    return document;
  },
});

export const getById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Not found");
    }

    if (project.isPublished && !project.isArchived) {
      return project;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (project.userId !== userId) {
      throw new Error("Not authorized");
    }

    return project;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return projects;
  },
});

export const archive = mutation({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Not authorized");
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    for (const document of documents) {
      await ctx.db.patch(document._id, {
        isArchived: true,
      });
    }

    const images = await ctx.db
      .query("images")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    for (const image of images) {
      await ctx.db.patch(image._id, {
        isArchived: true,
      });
    }

    const project = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return project;
  },
});

export const restore = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Not authorized");
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();

    for (const document of documents) {
      await ctx.db.patch(document._id, {
        isArchived: false,
      });
    }

    const images = await ctx.db
      .query("images")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();

    for (const image of images) {
      await ctx.db.patch(image._id, {
        isArchived: false,
      });
    }

    const project = await ctx.db.patch(args.id, {
      isArchived: false,
    });

    return project;
  },
});

export const remove = mutation({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingProject = await ctx.db.get(args.id);

    if (!existingProject) {
      throw new Error("Not found");
    }

    if (existingProject.userId !== userId) {
      throw new Error("Not authorized");
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();

    for (const document of documents) {
      await ctx.db.delete(document._id);
    }

    const images = await ctx.db
      .query("images")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.id),
      )
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();

    for (const image of images) {
      await ctx.db.delete(image._id);
    }

    const project = await ctx.db.delete(args.id);

    return project;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return projects;
  },
});
