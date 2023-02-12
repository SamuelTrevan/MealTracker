





using MealTracker.Models;
using MealTracker.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace MealTracker.Repositories
{
    public class MealTypeRepository : BaseRepository, IMealTypeRepository
    {
        public MealTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<MealTypes> GetAllMealTypes()
        {
            var mealTypes = new List<MealTypes>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name FROM MealType ORDER BY id";
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        mealTypes.Add(new MealTypes
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        });
                    }
                    reader.Close();
                    return mealTypes;
                }
            }
        }
    }
}
