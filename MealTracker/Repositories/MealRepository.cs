




using MealTracker.Models;
using MealTracker.Repositories;
using MealTracker.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Mealtracker.Repositories
{
    public class MealRepository : BaseRepository, IMealRepository
    {
        public MealRepository(IConfiguration configuration) : base(configuration) { }

        public UserMeals GetAllMealsByUserId(int id, DateTime date)
        {
            var usermeals = new UserMeals
            {
                Meals = new List<UserMeal>(),

                TotalFat = 0,
                TotalProtein = 0,
                TotalCarbs = 0,
                TotalSodium = 0,

            };
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select m.id as mealId, m.date, m.userprofileId, m.mealTypeId, 
                                               mi.id as mealIngredientId, mi.IngredientId, mi.MealId,                                          i.id as ingredientId, i.name as ingredientName, i.ServingSize, i.Fat,i.Protein,                 i.Carbs, i.Sodium,
                                               mt.id as mealTypeId, mt.name as mealName
                                        From Meal m
                                        JOIN MealIngredient mi on m.Id = mi.MealId
                                        JOIN Ingredient i on mi.IngredientId = i.Id
                                        JOIN MealType mt on m.mealTypeId = mt.id
                                        Where m.userprofileId =  @id and CONVERT(DATE, m.Date) = @date";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@date", date.Date);
                    var reader = cmd.ExecuteReader();
                    UserMeal meal = null;
                    while (reader.Read())
                    {
                        while (reader.Read())
                        {
                            meal = usermeals.Meals.SingleOrDefault((m) => m.Id == DbUtils.GetInt(reader, "mealId"));
                            if (meal == null) {                             
                                meal = new UserMeal
                                {
                                    Id = DbUtils.GetInt(reader, "mealId"),
                                    Date = DbUtils.GetDateTime(reader, "date"),
                                    UserProfileId = DbUtils.GetInt(reader, "userprofileId"),
                                    MealName = DbUtils.GetString(reader, "mealName"),
                                    Ingredients = new List<string>(),
                                    TotalFat = 0,
                                    TotalCarbs = 0,
                                    TotalProtein = 0,
                                    TotalSodium = 0,
                                };
                                usermeals.Meals.Add(meal);
                            } ;
                                meal.Ingredients.Add(DbUtils.GetString(reader, "ingredientName"));
                                meal.TotalFat += DbUtils.GetInt(reader, "Fat");
                                meal.TotalCarbs += DbUtils.GetInt(reader, "Carbs");
                                meal.TotalProtein += DbUtils.GetInt(reader, "Protein");
                                meal.TotalSodium += DbUtils.GetInt(reader, "Sodium");


                            usermeals.TotalFat += DbUtils.GetInt(reader, "Fat");
                            usermeals.TotalCarbs += DbUtils.GetInt(reader, "Carbs");
                            usermeals.TotalProtein += DbUtils.GetInt(reader, "Protein");
                            usermeals.TotalSodium += DbUtils.GetInt(reader, "Sodium");

                        }
                    }
                    reader.Close();
                    return usermeals;
                }
            }
        }

        public void AddMeal(MealIngredients meal)
        {
            using (SqlConnection conn = Connection) 
            {
                conn.Open();

                using(SqlCommand cmd = conn.CreateCommand()) 
                {
                    cmd.CommandText = @"INSERT INTO Meal (date, userProfileId, mealTypeId) OUTPUT INSERTED.Id VALUES(@date, @userProfileId, @mealTypeId)";

                    cmd.Parameters.AddWithValue("date", meal.Date);
                    cmd.Parameters.AddWithValue("userProfileId", meal.UserProfileId);
                    cmd.Parameters.AddWithValue("mealTypeId", meal.MealTypeId);

                    meal.Id = (int)cmd.ExecuteScalar();
                }
                meal.Ingredients.ForEach(i =>
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO MealIngredient (ingredientId, mealId) VALUES(@ingredientId, @mealId)";

                        cmd.Parameters.AddWithValue("ingredientId", i);
                        cmd.Parameters.AddWithValue("mealId", meal.Id);
                        
                        cmd.ExecuteScalar();
                    }
                }); 
            }
        }

        public void DeleteMeal(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Meal
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

    }
}
