var User = function(FirstName,LastName,Email,Phone,Username,Password) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Phone = Phone;
    this.Username = Username;
    this.Password = Password;
}
var Expense = function (User, Category, SubCategory, Amount, Frequency, Type, Date, Details){
    this.User = User;
    this.Category = Category;
    this.SubCategory = SubCategory;
    this.Amount = Amount;
    this.Frequency = Frequency;
    this.Type = Type;
    this.Date = Date;
    this.Details = Details;
}

var Incomes = function (User, Income, Frequency, Savings, Debts){
    this.User = User;
    this.Income = Income;
    this.Frequency = Frequency;
    this.Savings = Savings;
    this.Debts = Debts;
}

const Categories = [
    {
        category: 'Food',
        subcategory: ['Grocery','Dining Out', 'Fast Food', 'Others']
    },
    {
        category: 'Debts',
        subcategory: ['Credit Card', 'Car Loan', 'Personal Loan', 'Family Loan', 'Others']
    },
    {
        category: 'Fun',
        subcategory: ['Friends Outing','Family Outing','Hobbies','Sports','Events','Others']
    },
    {
        category: 'Gifting',
        subcategory: ['Birthdays','Festivels','Friends/Family','Office/College','Others']
    },
    {
        category: 'Home',
        subcategory: ['Rent/Mortgage','Maintenance','Security','Taxes','Furniture/Decore','Others']
    },
    {
        category: 'Insurance',
        subcategory: ['Home','Life','Car','Others']
    },
    {
        category: 'Personal',
        subcategory: ['Clothing','Skin Care','Health Care','Development','Others']
    },
    {
        category: 'Pet',
        subcategory: ['Grooming','Food','VET','Insurance','Toys/Supplies','Others']
    },
    {
        category: 'Savings',
        subcategory: ['Emergancy','Vacation','House','Car','Others']
    },
    {
        category: 'Subscriptions',
        subcategory: ['OTT','Music','Storage','Educational','Clubs/Gyms','Stores','Personal','Others']
    },
    {
        category: 'Transportation',
        subcategory: ['Gas','Maintenance','Public Pass','Tolls','Cabs','Others']
    },
    {
        category: 'Utilities',
        subcategory: ['Hydro','Water/Natural Gas','Phone Bills','Internet Bills','Cable' ,'Others']
    }
]