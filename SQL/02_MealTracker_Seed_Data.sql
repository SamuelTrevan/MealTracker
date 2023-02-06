USE [MealTracker];
GO

set identity_insert [MealType] on
insert into [MealType] ([ID], [Name]) VALUES (1, 'Breakfast'), (2, 'Lunch'), (3, 'Dinner'), (4, 'Snack');
set identity_insert [MealType] off

set identity_insert [Ingredient] on
insert into [Ingredient] ([Id], [Name], [ImageUrl], [ServingSize], [Fat], [Protein], [Carbs], [Sodium])
values (1, 'ChickenBrest', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 4, 3, 53, 0, 0), (2, 'Rice', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 158, 1, 4, 45, 2), (3, 'Honey Nut Cheerios', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 37, 2, 3, 30, 210), (4, 'Wheat Thins', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 31, 5, 2, 22, 210);
set identity_insert [Ingredient] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirstName, LastName, Email,  DisplayName, ProfileImage, FirebaseUserId) 
values (1, 'Fatty', 'McFatface', 'fatty@test.com', 'McFatty', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 'QATxsHpmAqZyEwXiOoHK4Wj9s3C3');
insert into UserProfile (Id, FirstName, LastName, Email,  DisplayName, ProfileImage, FirebaseUserId) 
values (2, 'Test', 'McTestface', 'test@test.com', 'McTesty', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', '0xKs5J0Z0NXGR6bZ1iS0psIv2AH2');
set identity_insert [UserProfile] off

set identity_insert [Meal] on
insert into [Meal] ([Id], [Date], [UserProfileId], [MealTypeId]) 
values (1, '2023-02-01', 1, 1 ), (2, '2023-02-01', 1, 2), (3, '2023-02-01', 1, 3), (4, '2023-02-01', 1, 4);
set identity_insert [Meal] off

set identity_insert [MealIngredient] on
insert into MealIngredient (Id, IngredientId, MealId) values (1, 3, 1);
insert into MealIngredient (Id, IngredientId, MealId) values (2, 1, 2);
insert into MealIngredient (Id, IngredientId, MealId) values (3, 2, 2);
insert into MealIngredient (Id, IngredientId, MealId) values (4, 1, 3);
insert into MealIngredient (Id, IngredientId, MealId) values (5, 2, 3);
insert into MealIngredient (Id, IngredientId, MealId) values (6, 4, 4);
set identity_insert [MealIngredient] off

set identity_insert [FavoriteIngredient] on
insert into FavoriteIngredient (Id, IngredientId, UserProfileId) values (1, 1, 1);
insert into FavoriteIngredient (Id, IngredientId, UserProfileId) values (2, 1, 2);
set identity_insert [FavoriteIngredient] off


select *
From MealType

select *
From Meal
where UserProfileId = 1

select *
From Ingredient

select *
From UserProfile

select *
From MealIngredient

Select *
From FavoriteIngredient