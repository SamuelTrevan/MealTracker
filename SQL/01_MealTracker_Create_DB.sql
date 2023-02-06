USE [master]

IF db_id('MealTracker') IS NULl
  CREATE DATABASE [MealTracker]
GO

USE [MealTracker]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Ingredient];
DROP TABLE IF EXISTS [MealType];
DROP TABLE IF EXISTS [Meal];
DROP TABLE IF EXISTS [MealIngredient];
DROP TABLE IF EXISTS [FavoriteIngredient];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [ProfileImage] nvarchar(255),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL
)
GO

CREATE TABLE [Ingredient] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [ServingSize] int NOT NULL,
  [Fat] int NOT NULL,
  [Protein] int NOT NULL,
  [Carbs] int NOT NULL,
  [Sodium] int NOT NULL
)
GO

CREATE TABLE [MealType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Meal] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Date] datetime NOT NULL,
  [UserProfileId] int NOT NULL,
  [MealTypeId] int NOT NULL
)
GO

CREATE TABLE [MealIngredient] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [IngredientId] int NOT NULL,
  [MealId] int NOT NULL
)
GO

CREATE TABLE [FavoriteIngredient] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [IngredientId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

ALTER TABLE [Meal] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Meal] ADD FOREIGN KEY ([MealTypeId]) REFERENCES [MealType] ([Id])
GO

ALTER TABLE [MealIngredient] ADD FOREIGN KEY ([IngredientId]) REFERENCES [Ingredient] ([Id])
GO

ALTER TABLE [MealIngredient] ADD FOREIGN KEY ([MealId]) REFERENCES [Meal] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [FavoriteIngredient] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [FavoriteIngredient] ADD FOREIGN KEY ([IngredientId]) REFERENCES [Ingredient] ([Id])
GO
