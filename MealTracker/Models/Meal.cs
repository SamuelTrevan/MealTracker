using System;

namespace MealTracker.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserProfileId { get; set; }
        public int MealTypeId { get; set; }

    }
}
