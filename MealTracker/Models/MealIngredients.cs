using System;
using System.Collections.Generic;
using System.Data;

namespace MealTracker.Models
{
    public class MealIngredients
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int UserProfileId { get; set; }
        public int MealTypeId { get; set; }

        public List<int> Ingredients { get; set;}
    }
}
