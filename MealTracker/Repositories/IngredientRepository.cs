using MealTracker.Models;
using System.ComponentModel.Design;
using MealTracker.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MealTracker.Repositories
{
    public class IngredientRepository : BaseRepository, IIngredientRepository
    {
        public IngredientRepository(IConfiguration configuration) : base(configuration) { }

        public List<Ingredient> GetAllIngredients()
        {
            var foods = new List<Ingredient>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name, imageUrl, servingSize, fat, protein, carbs, sodium
                                    From Ingredient ORDER BY name;";

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        foods.Add(new Ingredient
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ImageUrl = DbUtils.GetString(reader, "imageUrl"),
                            ServingSize = DbUtils.GetInt(reader, "servingSize"),
                            Fat = DbUtils.GetInt(reader, "fat"),
                            Protein = DbUtils.GetInt(reader, "protein"),
                            Carbs = DbUtils.GetInt(reader, "carbs"),
                            Sodium = DbUtils.GetInt(reader, "sodium"),
                        });
                    }
                    reader.Close();
                    return foods;
                }
            }
        }
    }
}
