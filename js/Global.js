$(document).ready(function () {
  init();
  initDb();
});

function init() {
  $('#btnSignin').on('click', CheckUserLogin);
  $('#btnLogin').on('click', frmLogin);
  $('#RegisterPage').on('pageshow', ()=>{  $('#frmRegister')[0].reset();});
  $('#btnRegister').on('click', frmRegister);

  //Menu Buttons//
  $('#MenuPage').on('pageshow', CheckUserLogin);
  $('.notify-icon').on('click', ()=>{$.mobile.changePage($('#NotificationPage')); });
  $('.menu-icon').on('click', ()=>{$.mobile.changePage($('#MenuPage')); });
  $('#btnHome').on('click', ()=>{$.mobile.changePage($('#UserPage')); });
  $('#btnAddIncome').on('click', ()=>{$.mobile.changePage($('#AddIncomePage'));$('#frmAddIncome')[0].reset() } )
  $('#btnGraph').on('click', ()=>{$.mobile.changePage($('#VisualExpensePage')); });
  $('#btnSettings').on('click',()=>{$.mobile.changePage($('#SettingsPage'));$('#frmUpdateUser')[0].reset()})
  $('#btnSignOut').on('click', LogOut);

  //UserPage Show//
  $('#UserPage').on('pageshow', UpdateCard);
  $('#btnAddExpenses').on('click',() =>{ $.mobile.changePage($('#AddExpensePage'));});
  $('#btnPostIncome').on('click', btnPostIncome);
  $('#AddExpensePage').on('pageshow', AddExpensePopulate)
  $('#AddExpCat').on('change', AddPopulateSubCategories);
  $('#btnPostExpense').on('click', btnPostExpense);
  $('body').on('pagechange', pagechanges);

  //Expense Report Page//
  $('#btnExpReport').on('click',() =>{ $.mobile.changePage($('#ExpenseReportPage'));});
  $('#ExpCat').on('change', ExpPopulateSubCategories);
  $('#ExpSubCat').on('change', ExpenseReport);
  $('#ExpMonth').on('change', ExpenseReport);
  $('#ExpYear').on('change', ExpenseReport);
  $('#ExpenseReportPage').on('pageshow', PopulateMonthYear);

  //Visual Page//
  $('#VisualExpensePage').on('pageshow', VisualPageShow);
  $('#VisualCat').on('change', DeployGraph);
  $('#VisualMonth').on('change', DeployGraph);
  $('#VisualYear').on('change', DeployGraph);

  //Delete Page//
  $('#Cancel').on('click', () => {$.mobile.changePage($('#ExpenseReportPage'))});
  $('.button').on('click',  DeleteExpense);

  // Update User
  $('#SettingsPage').on('pageshow', CheckUserLogin);
  $('#btnUpdate').on('click', UpdateUser);
}
function initDb(){
  try{
    DB.createDatabase();
    if(db){
      DB.createTables();
    }
    else{
      console.error("Error while opening the database");
    }
  }
  catch (error){
    console.error("ERRORS :"+error);
  }
}
function pagechanges(){
  $('.validator').hide();
  $('form input').removeClass('error').removeClass('valid');
  userdb.selectUser([localStorage.getItem('user')],callback);
  function callback(tx, results) {
    try {
      let data = results.rows[0];
      $('.username').html(data['FirstName']);
    } catch {
    }
  }
}
