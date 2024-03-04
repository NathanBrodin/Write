import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),

    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()), // The user's profile picture URL
  })
    .index("by_token", ["tokenIdentifier"])
    .searchIndex("search_user", { searchField: "name" }), // https://docs.convex.dev/text-search#defining-search-indexes

  projects: defineTable({
    userId: v.string(), // The user who created the project

    title: v.string(),

    isArchived: v.boolean(),
    isPublished: v.boolean(),
  }).index("by_user", ["userId"]),

  // Defines a table that represents the users that have access to a project
  collaborators: defineTable({
    projectId: v.id("projects"), // The project that is being collaborated on
    users: v.id("users"), // The user who is a collaborator
  }).index("by_project", ["projectId"]),

  documents: defineTable({
    projectId: v.id("projects"),
    userId: v.string(), // The user who created the file

    title: v.string(),
    content: v.optional(v.string()),

    isArchived: v.boolean(),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_project", ["userId", "projectId"]),

  images: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),

    title: v.string(),
    url: v.string(),

    isArchived: v.boolean(),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_project", ["userId", "projectId"]),
});
