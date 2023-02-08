using MealTracker.Models;
using System.ComponentModel.Design;
using MealTracker.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.Data.SqlClient;

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

        public bool CheckIfExsists(string name)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Name FROM Ingredient WHERE Name= @name";

                    cmd.Parameters.AddWithValue("name", name);

                    var reader = cmd.ExecuteReader();
                    return reader.HasRows;

                }
            }
        }

        public void AddIngredient(Ingredient ingredient)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Ingredient (Name, ImageUrl, ServingSize, Fat, Protein, Carbs, Sodium)
                    OUTPUT INSERTED.Id
                    Values(@name, @imageUrl, @servingSize, @fat, @protein, @carbs, @sodium)";

                    cmd.Parameters.AddWithValue("name", ingredient.Name);
                    cmd.Parameters.AddWithValue("imageUrl", ingredient.ImageUrl);
                    cmd.Parameters.AddWithValue("servingSize", ingredient.ServingSize);
                    cmd.Parameters.AddWithValue("fat", ingredient.Fat);
                    cmd.Parameters.AddWithValue("protein", ingredient.Protein);
                    cmd.Parameters.AddWithValue("carbs", ingredient.Carbs);
                    cmd.Parameters.AddWithValue("sodium", ingredient.Sodium);

                    ingredient.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public Ingredient GetIngredientById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT i.id, i.name, i.imageUrl, i.servingSize, i.fat, i.protein, i.carbs, i.sodium
                                        FROM Ingredient i
                                        WHERE i.id =@id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Ingredient food = null;

                    while (reader.Read())
                    {
                        food = (new Ingredient()
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
                    return food;
                }
            }
        }

        public void DeleteIngredient(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Ingredient
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }





    }
}

