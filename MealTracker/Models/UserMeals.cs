using System.Collections.Generic;
using System;
using System.Xml.Schema;

namespace MealTracker.Models
{
    public class UserMeal
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserProfileId { get; set; }
        public string MealName { get; set; }

        public List<string> Ingredients { get; set; }

        public int TotalFat { get; set; }
        public int TotalProtein { get; set; }
        public int TotalCarbs { get; set; }
        public int TotalSodium { get; set; }

    }
    public class UserMeals
    {
        public List<UserMeal> Meals { get; set; }
        public int TotalFat { get; set; }
        public int TotalProtein { get; set; }
        public int TotalCarbs { get; set; }
        public int TotalSodium { get; set; }

    }
}
