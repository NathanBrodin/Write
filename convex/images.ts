import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const images = await ctx.db.insert("images", {
      title: args.title,
      url: args.url,
      projectId: args.projectId,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return images;
  },
});

export const update = mutation({
  args: {
    id: v.id("images"),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingImage = await ctx.db.get(id);

    if (!existingImage) {
      throw new Error("Not found");
    }

    if (existingImage.userId !== userId) {
      throw new Error("Not authorized");
    }

    const images = await ctx.db.patch(id, rest);

    return images;
  },
});

export const getById = query({
  args: { imageId: v.id("images") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const image = await ctx.db.get(args.imageId);

    if (!image) {
      throw new Error("Not found");
    }

    if (image.isPublished && !image.isArchived) {
      return image;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (image.userId !== userId) {
      throw new Error("Not authorized");
    }

    return image;
  },
});

export const getByProjectId = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const images = await ctx.db
      .query("images")
      .withIndex("by_user_project", (q) =>
        q.eq("userId", userId).eq("projectId", args.projectId),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return images;
  },
});

export const archive = mutation({
  args: {
    id: v.id("images"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingImage = await ctx.db.get(args.id);

    if (!existingImage) {
      throw new Error("Not found");
    }

    if (existingImage.userId !== userId) {
      throw new Error("Not authorized");
    }

    const images = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return images;
  },
});

export const restore = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingImage = await ctx.db.get(args.id);

    if (!existingImage) {
      throw new Error("Not found");
    }

    if (existingImage.userId !== userId) {
      throw new Error("Not authorized");
    }

    const images = await ctx.db.patch(args.id, {
      isArchived: false,
    });

    return images;
  },
});

export const remove = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingImage = await ctx.db.get(args.id);

    if (!existingImage) {
      throw new Error("Not found");
    }

    if (existingImage.userId !== userId) {
      throw new Error("Not authorized");
    }

    const images = await ctx.db.delete(args.id);

    return images;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const images = await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return images;
  },
});

// TODO: See if we can use a search index for this
export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const images = await ctx.db
      .query("images")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return images;
  },
});
