using MealTracker.Models;
using Microsoft.Extensions.Configuration;
using MealTracker.Utils;

namespace MealTracker.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.Email, up.DisplayName, up.ProfileImage, up.FirebaseUserId
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            ProfileImage = DbUtils.GetString(reader, "ProfileImage"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, Email, DisplayName, ProfileImage,  FirebaseUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirstName, @LastName, @Email, @DisplayName, @ProfileImage, @FirebaseUserId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@ProfileImage", userProfile.ProfileImage);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //public UserProfile GetCurrentUserbyId
    }
}
