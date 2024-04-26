const dt = new Date();
const day = ("0" + dt.getDate()).slice(-2);
const month = ("0" + (dt.getMonth() + 1)).slice(-2);
const year = dt.getFullYear();
const date = year + "-" + month + "-" + day;
function frmLogin(){
    const required = "Required *";
    let username = $('#loginUsername');
    let options = [username.val()];
    let password = $('#loginPswd');
    let uname="";
    let pswd = "";

    $('.frmdiv input').removeClass('error').removeClass('valid');
    $('.validator').hide();
    let loginUserValid = $('#loginUserValid');
    let loginPswdValid = $('#loginPswdValid');


    userdb.selectUser(options,callback);

    function callback(tx, results){
        try {
            let data = results.rows[0];
            uname = data['Username']
            pswd = data['Password'];
            if(username.val()===uname){
                username.addClass('valid');
            }
            if(username.val()===uname && password.val()===pswd){
               $.mobile.changePage($('#UserPage'));
               $('.username').html(data['FirstName']);
               localStorage.setItem('user', uname);
            }
            if(password.val()==null||password.val()===""){
                loginPswdValid.html(required).show();
                password.addClass('error');
            }else if(password.val()!==pswd){
                loginPswdValid.html("Invalid Password *").show();
                password.addClass('error');
            }
        } catch (e) {
            if(username.val()==null||username.val()===""){
                loginUserValid.html(required).show();
                username.addClass('error');
            }else{
                loginUserValid.html("User not found *").show();
                username.addClass('error');
            }
            if(password.val()==null||password.val()===""){
                loginPswdValid.html(required).show();
                password.addClass('error');
            }
        }
    }
}
function frmRegister(){
    let phoneRegex = new RegExp(/^\d{10}$/);
    let pswdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)");
    let emailRegex=new RegExp(/[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
    let required = "Required";
    let pswdFormat = "Password should contain at least<br>one digit,<br>one lower case,<br>one upper case,<br>( ! @ # $ % & * _ ) <br>any of the 8 special characters mentioned";

    let fname = $('#registerFname');
    let lname = $('#registerLname');
    let email = $('#registerEmail');
    let phone = $('#registerPhone');
    let uname = $('#registerUsername');
    let pswd = $('#registerPswd');
    let cpswd = $('#registerConfirmpswd');

    $('.validator').hide();
    $('.frmdiv form input').removeClass('error');

    let fnameValid = $('#fnameValid');
    let lnameValid = $('#lnameValid');
    let emailValid = $('#emailValid');
    let phoneValid = $('#phoneValid');
    let unameValid = $('#unameValid');
    let pswdValid = $('#pswdValid');
    let cpswdValid = $('#cpswdValid');

    let options=[];
    userdb.selectAll(options,callback);

    function callback(tx, results){
        let valid = true;

        if(results.rows.length===0){

            if(fname.val()==null||fname.val()===""){
                fnameValid.html(required).show();
                fname.addClass('error');
                valid = false;
            }

            if(lname.val()==null||lname.val()===""){
                lnameValid.html(required).show();
                lname.addClass('error');
                valid = false;
            }

            if(email.val().toLowerCase()==null||email.val().toLowerCase()===""){
                emailValid.html(required).show();
                email.addClass('error');
                valid=false;
            }
            else if (!emailRegex.test(email.val().toLowerCase())) {
                emailValid.html(`Invalid Email format i.e. john@mark.com`).show();
                email.addClass('error');
                valid = false;
            }

            if(phone.val()==null||phone.val()===""){
                phoneValid.html(required).show();
                phone.addClass('error');
                valid = false;
            }
            else if(!phoneRegex.test(phone.val())){
                phoneValid.html(`Invalid Phone input`).show();
                phone.addClass('error');
                valid = false;
            }

            if(uname.val()==null||uname.val()===""){
                unameValid.html(required).show();
                uname.addClass('error');
                valid = false;
            }

            if(pswd.val()==null||pswd.val()===""){
                pswdValid.html(required).show();
                pswd.addClass('error');
                valid = false;
            }
            else if(!pswdRegex.test(pswd.val())){
                pswdValid.html(pswdFormat).show();
                pswd.addClass('error');
                valid = false;
            }

            if(cpswd.val()==null||cpswd.val()===""){
                cpswdValid.html(required).show();
                cpswd.addClass('error');
                valid = false;
            }
            else if(cpswd.val()!==pswd.val()){
                cpswdValid.html(`Password didnt match`).show();
                cpswd.addClass('error');
                valid = false;
            }

        }

        for(let i=0;i< results.rows.length; i++){
            let data = results.rows[i];

            if(fname.val()==null||fname.val()===""){
                fnameValid.html(required).show();
                fname.addClass('error');
                valid = false;
            }

            if(lname.val()==null||lname.val()===""){
                lnameValid.html(required).show();
                lname.addClass('error');
                valid = false;
            }

            if(email.val().toLowerCase()==null||email.val().toLowerCase()===""){
                emailValid.html(required).show();
                email.addClass('error');
                valid=false;
            }
            else if (!emailRegex.test(email.val().toLowerCase())) {
                emailValid.html(`Invalid Email format i.e. john@mark.com`).show();
                email.addClass('error');
                valid = false;
            }
            else if(email.val().toLowerCase()===data['Email'].toLowerCase()){
                emailValid.html("Email already registered, Please Login").show();
                email.addClass('error');
                valid = false;
            }

            if(phone.val()==null||phone.val()===""){
                phoneValid.html(required).show();
                phone.addClass('error');
                valid = false;
            }
            else if(!phoneRegex.test(phone.val())){
                phoneValid.html(`Invalid Phone input`).show();
                phone.addClass('error');
                valid = false;
            }

            if(uname.val()==null||uname.val()===""){
                unameValid.html(required).show();
                uname.addClass('error');
                valid = false;
            }
            else if(uname.val()===data['Username']){
                unameValid.html(`Username already registered`).show();
                uname.addClass('error');
                valid = false;
            }

            if(pswd.val()==null||pswd.val()===""){
                pswdValid.html(required).show();
                pswd.addClass('error');
                valid = false;
            }
            else if(!pswdRegex.test(pswd.val())){
                pswdValid.html(pswdFormat).show();
                pswd.addClass('error');
                valid = false;
            }
            if(cpswd.val()==null||cpswd.val()===""){
                cpswdValid.html(required).show();
                cpswd.addClass('error');
                valid = false;
            }
            else if(cpswd.val()!==pswd.val()){
                cpswdValid.html(`Password didnt match`).show();
                cpswd.addClass('error');
                valid = false;
            }
        }

        if(valid){
            let FirstName = $("#registerFname").val();
            let LastName = $("#registerLname").val();
            let Email = $("#registerEmail").val();
            let Phone = $("#registerPhone").val();
            let Username = $("#registerUsername").val();
            let Password = $("#registerPswd").val();
            let userData = new User(FirstName, LastName, Email, Phone, Username, Password);
            userdb.insertData(userData);
            $.mobile.changePage($('#LoginPage'));

        }
    }
}

//User Page Population//
function UpdateCard(){
    let user = localStorage.getItem('user');
    let UserCard = $('#UserCard');
    UserCard.html('').addClass('text-bg-success');
    incomedb.selectIncome([user], callback_income);

    function callback_income(tx, result){
        let data = result.rows[0];
        let income = data["Income"];
        let saving = data["Savings"];
        let frequency = data["Frequency"];
        let debt = data['Debts'];
        let expenses = 0;
        if(income===null||income===""){
            income=0;
        }
        if(saving===null||saving===""){
            saving=0;
        }
        if(debt===null||debt===""){
            debt=0;
        }
        switch (frequency){
            case "Weekly" : income = income * 4;
                break;
            case "Bi-Weekly" : income = income * 2;
                break;
        }
        expensedb.selectExpense([user], callback_expense)
        function callback_expense(tx, results){

            for(let i =0 ; i<results.rows.length; i++){
                let data = results.rows[i];
                let expmonth = data['Date'].split('-')[1];
                let cat = data['Category']
                if(expmonth === month){
                    expenses += data['Amount'];
                }
                if(cat ==="Debts"){
                    debt = debt-parseFloat(data['Amount']);
                }
            }
            let balance = income-expenses;

            if(balance<0){
                UserCard.removeClass('text-bg-success').removeClass('text-bg-warning').addClass('text-bg-danger');
            }else if(balance<=100){
                UserCard.removeClass('text-bg-success').removeClass('text-bg-danger').addClass('text-bg-warning');
            }
            UserCard.html(`
                    <div class="card-body">
                        <h1 class="card-title">$ ${income-expenses}</h1>
                        <hr>
                        <div class="card-text card-details">
                            <p>Total Income: $ ${income}</p>
                            <p>Total Expense: $ ${expenses}</p>
                            <p>Total Saving: $ ${saving}</p>
                            <p>Total Debts: $ ${debt}</p>
                        </div>
                    </div>
            `);
            CreateChart();
            UpdateTable();
        }
    }
}
function UpdateTable(){
    let user = localStorage.getItem('user');
    let rows = "";

    expensedb.selectExpense([user],callback);
    function callback(tx, result){
        if(result.rows.length===0){
        }
        else{
            Categories.forEach(item =>{
                let expense = 0;
                for(let e=0; e<result.rows.length;e++){
                        let data = result.rows[e];
                        let expmonth = data['Date'].split('-')[1];
                        if(expmonth === month && data['Category'] === item.category){
                            expense += data['Amount'];
                        }

                }
                if(expense>0){
                    rows +=`<tr>
                                <th scope="row">${item.category}</th>
                                <td>$ ${expense}</td>
                            </tr>`;
                }
            });
        }
        $('#UP-Table').html(rows);
    }
}
function CreateChart() {

    let fixed = 0;
    let wants = 0;
    let needs = 0;
    let savings = 0;
    expensedb.selectExpense([localStorage.getItem('user')],callback);
    function callback(tx, result){
        if(result.rows.length===0){
        }
        else{
            for(let i=0; i<result.rows.length;i++){
                let data = result.rows[i];
                let type = data['Type'];
                let expmonth = data['Date'].split('-')[1];
                if(expmonth === month) {
                    switch (type) {
                        case "Fixed" :
                            fixed += data['Amount'];
                            break;
                        case "Needs" :
                            needs += data['Amount'];
                            break;
                        case "Wants" :
                            wants += data['Amount'];
                            break;
                    }
                }
            }
        }

        incomedb.selectIncome([localStorage.getItem('user')],callback_income);
        function callback_income(tx, result){
            if(result.rows.length===0){
            }
            else{
                let data = result.rows[0];
                let income = data['Income'];
                let frequency = data["Frequency"];
                switch (frequency){
                    case "Weekly" : income = income * 4;
                        break;
                    case "Bi-Weekly" : income = income * 2;
                        break;
                }
                savings = income - fixed - needs - wants;
            }

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let data = google.visualization.arrayToDataTable([
                    ['Categories', 'Percentage'],
                    ['Fixed',fixed],
                    ['Needs',needs],
                    ['Wants',wants],
                    ['Savings ',savings]
                ]);

                var formatter = new google.visualization.NumberFormat({prefix: '$ '});

                formatter.format(data, 1);

                let options = {
                    is3D:true,
                    height : 300,
                    width : 500,
                    colors: ['#ff6300', '#00eaff', '#ff0900', '#4e00ff'],
                    valueLabelFormat: {prefix: '$'}
                };

                let chart = new google.visualization.PieChart(document.getElementById('UserChart'));
                chart.draw(data, options);

            }
        }
    }
}

//Add Expense Population//
function AddExpensePopulate(){
    $('#frmAddExpense')[0].reset();
    $('#AddExpDate').val(date);
}
function AddPopulateSubCategories(){
    try{
        $('#AddExpSubCat-button span').html("Select Sub-Category");
    }catch{}
    let category = $('#AddExpCat').val();
    let options = '<option value="">Select Sub-Category</option>';
    let selector = $('#AddExpSubCat');
    selector.html('');
    for(let i=0; i< Categories.length; i++){
        if(category===Categories[i].category){
            for(let e = 0; e<Categories[i].subcategory.length;e++){
                options += `<option value="${Categories[i].subcategory[e]}">${Categories[i].subcategory[e]}</option>`;
            }
        }
    }
    selector.html(options);
}
//Post Expense
function btnPostExpense(){
    let expCategory = $('#AddExpCat').val();
    let expSubCategory = $('#AddExpSubCat').val();
    let expAmount = $('#AddExpAmpt');
    let expFrequency = $('#AddExpFreq').val();
    let expType = $('#AddExpType').val();
    let expDate = $('#AddExpDate').val();
    let valid = true;
    let CategoryValid = $('#AddExpCatValid');
    let SubCategoryValid = $('#AddExpSubCatValid');
    let AmountValid = $('#AddExpAmptValid');

    expAmount.removeClass('error');

    if(expCategory===""){
        CategoryValid.html('Required').show();
        valid=false;
    }
    if(expSubCategory===""){
        SubCategoryValid.html('Required').show();
        valid=false;
    }
    if(expAmount.val()===""){
        AmountValid.html('Required').show();
        expAmount.addClass('error');
        valid=false;
    }

    if(valid){
        let User = localStorage.getItem('user');
        let Category = expCategory
        let SubCategory = expSubCategory;
        let Amount = expAmount.val();
        let Frequency = expFrequency;
        let Type = expType;
        let Date = expDate;
        let Details = $('#AddExpDetails').val();
        let expense = new Expense(User, Category, SubCategory, Amount, Frequency, Type, Date, Details)
        expensedb.insertData(expense);
        $.mobile.changePage($('#UserPage'));
        UpdateCard();
    }
}
//Post Income
function btnPostIncome(){
    let income = $('#AddIncAmpt')
    let saving = $('#AddSaveAmpt');
    let valid = true;
    let incomeValid = $('#AddIncAmptValid');
    let savingValid = $('#AddSaveAmptValid');

    $('.validator').hide();
    income.removeClass('error');
    saving.removeClass('error');

    if(income.val()==="" && saving.val()==="" ){
        incomeValid.html('Please enter Income Or Savings').show();
        savingValid.html('Please enter Income Or Savings').show();
        income.addClass('error');
        saving.addClass('error');
        valid = false;
    }
    if(valid){
        let User = localStorage.getItem('user');
        let Income = income.val();
        let Savings = saving.val();
        let Frequency = $('#AddIncFreq').val();
        let Debts = $('#AddDebtAmpt').val();

        let incomes = new Incomes(User,Income,Frequency,Savings,Debts);

        incomedb.selectIncome([User],callback)
        function callback(tx, result){
            if(result.rows.length===0){
                incomedb.insertData(incomes);
                $.mobile.changePage($('#UserPage'));
            }else{
                incomedb.update(incomes, User);
                $.mobile.changePage($('#UserPage'));
            }
        }
    }
}

//Populat Expense Report
function ExpPopulateSubCategories(){
    try{
        $('#ExpSubCat-button span').html("All Sub-Category");
    }catch{}
    let category = $('#ExpCat').val();
    let options = '<option value="All">All Sub-Category</option>';
    let selector = $('#ExpSubCat');
    selector.html('');
    for(let i=0; i< Categories.length; i++){
        if(category===Categories[i].category){
            for(let e = 0; e<Categories[i].subcategory.length;e++){
                options += `<option value="${Categories[i].subcategory[e]}">${Categories[i].subcategory[e]}</option>`;
            }
        }
    }
    selector.html(options);
    ExpenseReport();
}
function PopulateMonthYear(){
    let expmonth = ['All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $('#ExpMonth').val(month.toString());
    $('#ExpMonth-button span').html(expmonth[month.slice(1)]);

    expensedb.selectExpense([localStorage.getItem('user')],callback);
    function callback(tx, results){
        let years = [];
        let e = 0;
        for(let i=0;i<results.rows.length;i++){
            let data = results.rows[i];
            if(years.includes(`${data['Date'].split('-')[0]}`)){
            }else{
                years[e] =  `${data['Date'].split('-')[0]}`;
                e++;
            }
        }
        years.sort(function(a, b) {
            return b - a;
        });
        let option = "";
        years.forEach(item =>{
            option += `<option value="${item}">${item}</option>`;
        });
        $('#ExpYear').html(option).val(year.toString());
        $('#ExpYear-button span').html(year);
        ExpenseReport();
    }
}
function ExpenseReport(){
    let category = $('#ExpCat').val();
    let subCategory = $('#ExpSubCat').val();
    let expmonth = $('#ExpMonth').val();
    let expyear = $('#ExpYear').val();
    let expDiv = $('#expReport');
    expDiv.html('');
    if(category === "All" && expmonth==="All"){
        expensedb.selectExpense([localStorage.getItem('user')], callback1)
        function callback1(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear){
                    let card = document.createElement('div');
                        card.classList.add('card');
                        card.onclick = SelectExpense;
                        card.id = data['id'];
                        card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                    }

            }
        }
    }
    else if(category==="All"){
        expensedb.selectExpense([localStorage.getItem('user')], callback2)
        function callback2(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear && data['Date'].split('-')[1]===expmonth){
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.onclick = SelectExpense;
                    card.id = data['id'];
                    card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                }
            }
        }
    }
    else if(subCategory==="All" && expmonth==="All"){
        expensedb.selectExpense([localStorage.getItem('user')], callback3)
        function callback3(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear && data['Category']=== category){
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.onclick = SelectExpense;
                    card.id = data['id'];
                    card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                }
            }
        }
    }
    else if(subCategory==="All"){
        expensedb.selectExpense([localStorage.getItem('user')], callback4)
        function callback4(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear && data['Date'].split('-')[1]===expmonth && data['Category']=== category){
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.onclick = SelectExpense;
                    card.id = data['id'];
                    card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                }
            }
        }
    }
    else if(expmonth==="All"){
        expensedb.selectExpense([localStorage.getItem('user')], callback5)
        function callback5(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear && data['Category']=== category && data['SubCategory']=== subCategory){
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.onclick = SelectExpense;
                    card.id = data['id'];
                    card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                }
            }
        }
    }
    else{
        expensedb.selectExpense([localStorage.getItem('user')], callback6)
        function callback6(tc, result){
            for (let i=0; i<result.rows.length; i++){
                let data = result.rows[i];
                if(data['Date'].split('-')[0]===expyear && data['Date'].split('-')[1]===expmonth && data['Category']=== category && data['SubCategory']=== subCategory){
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.onclick = SelectExpense;
                    card.id = data['id'];
                    card.innerHTML =`
                                  <div class="card-body">
                                    <div class="grid-it">
                                        <h5 class="card-title">${data['Category']}</h5>
                                        <h5 class="card-title">${data['SubCategory']}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Amount: $ ${data['Amount']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Date: ${data['Date']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Frequency: ${data['Frequency']}</h6>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Type: ${data['Type']}</h6>
                                    </div>
                                    <p class="card-text">${data['Details']}</p>
                                  </div>
                            `;
                    expDiv.append(card);
                    expDiv.append(`<br>`);
                }
            }
        }
    }
}

//Visual Page//
function VisualPageShow(){
    let expmonth = ['All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $('#VisualMonth').val(month.toString());
    $('#VisualMonth-button span').html(expmonth[month.slice(1)]);

    expensedb.selectExpense([localStorage.getItem('user')],callback);
    function callback(tx, results){
        let years = [];
        let e = 0;
        for(let i=0;i<results.rows.length;i++){
            let data = results.rows[i];
            if(years.includes(`${data['Date'].split('-')[0]}`)){
            }else{
                years[e] =  `${data['Date'].split('-')[0]}`;
                e++;
            }
        }
        years.sort(function(a, b) {
            return b - a;
        });
        let option = "";
        years.forEach(item =>{
            option += `<option value="${item}">${item}</option>`;
        });
        $('#VisualYear').html(option).val(year.toString());
        $('#VisualYear-button span').html(year);
        DeployGraph();
    }
}
function DeployGraph(){
    let category = $('#VisualCat').val();
    let expmonth = $('#VisualMonth').val();
    let expyear = $('#VisualYear').val();
    $('#VisualGraph').html(``);

    if(category==="All" && expmonth==="All"){
        let rows = [['Category','Expense']];
        expensedb.selectExpense([localStorage.getItem('user')], callback1)
        function callback1(tc, result){
            if(result.rows.length===0){
            }
            else{
                let i = 1;
                Categories.forEach(item =>{
                    let expense = 0;
                    for(let e=0; e<result.rows.length;e++){
                        let data = result.rows[e];
                        if(data['Date'].split('-')[0]===expyear && data['Category'] === item.category){
                            expense += data['Amount'];
                        }
                    }
                    if(expense>0){
                        rows[i] =[item.category,expense];
                        i++;
                    }
                });
            }

            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(rows);

                var formatter = new google.visualization.NumberFormat({prefix: '$ '});
                formatter.format(data, 1);

                var options = {
                    height : 400,
                    colors : ['#5e1a1a'],
                    legend: { position: "none" },
                };

                var chart = new google.charts.Bar(document.getElementById('VisualGraph'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    }
    else if(category==="All"){
        let rows = [['Category','Expense']];
        expensedb.selectExpense([localStorage.getItem('user')], callback2)
        function callback2(tc, result){
            if(result.rows.length===0){
            }
            else{
                let i = 1;
                Categories.forEach(item =>{
                    let expense = 0;
                    for(let e=0; e<result.rows.length;e++){
                        let data = result.rows[e];
                        if(data['Date'].split('-')[0]===expyear && data['Date'].split('-')[1]===expmonth && data['Category'] === item.category){
                            expense += data['Amount'];
                        }
                    }
                    if(expense>0){
                        rows[i] =[item.category,expense];
                        i++;
                    }
                });
            }
            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(rows);

                var formatter = new google.visualization.NumberFormat({prefix: '$ '});
                formatter.format(data, 1);

                var options = {
                    height : 400,
                    colors : ['#5e1a1a'],
                    legend: { position: "none" },
                };

                var chart = new google.charts.Bar(document.getElementById('VisualGraph'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    }
    else if(expmonth==="All"){
        let rows = [['Sub-Category','Expense']];
        expensedb.selectCategory([category,localStorage.getItem('user')], callback3)
        function callback3(tc, result){
            if(result.rows.length===0){
            }
            else{
                let subcategory = [];
                for(let e=0; e<result.rows.length;e++){
                    let data = result.rows[e];
                    if(data['Date'].split('-')[0] === expyear){
                        subcategory[e] = data['SubCategory'];
                    }
                }
                subcategory = new Set(subcategory);
                subcategory = Array.from(subcategory);
                subcategory.forEach((item, index) =>{
                    let amount = 0;
                    for(let i=0; i<result.rows.length;i++){
                        let data = result.rows[i];
                        if(data['Date'].split('-')[0] === expyear && data['SubCategory'] === item){
                            amount +=data['Amount'];
                        }
                    }
                    rows[index+1] = [item,amount];
                });
            }
            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(rows);

                var formatter = new google.visualization.NumberFormat({prefix: '$ '});
                formatter.format(data, 1);

                var options = {
                    height : 400,
                    colors : ['#5e1a1a'],
                    legend: { position: "none" },
                };

                var chart = new google.charts.Bar(document.getElementById('VisualGraph'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    }
    else{
        let rows = [['Sub-Category','Expense']];
        expensedb.selectCategory([category,localStorage.getItem('user')], callback4)
        function callback4(tc, result){
            if(result.rows.length===0){
            }
            else{
                let subcategory = [];
                for(let e=0; e<result.rows.length;e++){
                    let data = result.rows[e];
                    if(data['Date'].split('-')[0] === expyear && data['Date'].split('-')[1] === expmonth){
                        subcategory[e] = data['SubCategory'];
                    }
                }
                subcategory = new Set(subcategory);
                subcategory = Array.from(subcategory);
                subcategory.forEach((item, index) =>{
                    let amount = 0;
                    for(let i=0; i<result.rows.length;i++){
                        let data = result.rows[i];
                        if(data['Date'].split('-')[0] === expyear && data['Date'].split('-')[1] === expmonth && data['SubCategory'] === item){
                            amount +=data['Amount'];
                        }
                    }
                    rows[index+1] = [item,amount];
                });
            }

            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(rows);

                var formatter = new google.visualization.NumberFormat({prefix: '$ '});
                formatter.format(data, 1);

                var options = {
                    height : 400,
                    colors : ['#5e1a1a'],
                    legend: { position: "none" },
                };

                var chart = new google.charts.Bar(document.getElementById('VisualGraph'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
            }
        }
    }
}

//Delete Expense//
function SelectExpense(){
    let id = this.id;
    let expDetails = $('#ExpenseDetails');

    expensedb.selectId([id], callback)
    function callback(tx, result) {
        try {
            let data = result.rows[0];
            let table = document.createElement('table');
            table.classList.add('table');
            table.innerHTML = `
                    <tbody>
                        <tr>
                           <th scope="row">Category</th>
                           <td>${data['Category']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Sub-Category</th>
                           <td>${data['SubCategory']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Amount</th>
                           <td>$ ${data['Amount']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Frequency</th>
                           <td>${data['Frequency']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Type</th>
                           <td>${data['Type']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Date</th>
                           <td>${data['Date']}</td>
                        </tr>
                        <tr>
                           <th scope="row">Details</th>
                           <td>${data['Details']}</td>
                        </tr>
                    </tbody>
                    `;
            expDetails.html('').append(table);
        $.mobile.changePage($('#DeleteExpensePage'));
        $('.button').attr('id', `${id}`);
        } catch {
            $.mobile.changePage($('#ExpenseReportPage'));
        }
    }
}
function DeleteExpense(){
    let id = $('.button').attr('id');
    expensedb.delete([id]);
    $.mobile.changePage($('#ExpenseReportPage'));

}

//Update User//
function UpdateUser(){
    let phoneRegex = new RegExp(/^\d{10}$/);
    let pswdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)");
    let emailRegex=new RegExp(/[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/);
    let required = "Required";
    let pswdFormat = "Password should contain at least<br>one digit,<br>one lower case,<br>one upper case,<br>( ! @ # $ % & * _ ) <br>any of the 8 special characters mentioned";

    let email = $('#updateEmail');
    let phone = $('#updatePhone');
    let pswd = $('#updatePswd');
    let cpswd = $('#updateConfirmpswd');

    let emailValid = $('#updateEmailValid');
    let phoneValid = $('#updatePhoneValid');
    let pswdValid = $('#updatePswdValid');
    let cpswdValid = $('#updateCpswdValid');

    $('.validator').hide();
    $('.frmdiv form input').removeClass('error');

    let options=[];
    userdb.selectAll(options,callback);

    function callback(tx, results){
        let valid = true;

        if(results.rows.length===0){

            if(email.val().toLowerCase()==null||email.val().toLowerCase()===""){
                emailValid.html(required).show();
                email.addClass('error');
                valid=false;
            }
            else if (!emailRegex.test(email.val().toLowerCase())) {
                emailValid.html(`Invalid Email format i.e. john@mark.com`).show();
                email.addClass('error');
                valid = false;
            }

            if(phone.val()==null||phone.val()===""){
                phoneValid.html(required).show();
                phone.addClass('error');
                valid = false;
            }
            else if(!phoneRegex.test(phone.val())){
                phoneValid.html(`Invalid Phone input`).show();
                phone.addClass('error');
                valid = false;
            }

            if(pswd.val()==null||pswd.val()===""){
                pswdValid.html(required).show();
                pswd.addClass('error');
                valid = false;
            }
            else if(!pswdRegex.test(pswd.val())){
                pswdValid.html(pswdFormat).show();
                pswd.addClass('error');
                valid = false;
            }

            if(cpswd.val()==null||cpswd.val()===""){
                cpswdValid.html(required).show();
                cpswd.addClass('error');
                valid = false;
            }
            else if(cpswd.val()!==pswd.val()){
                cpswdValid.html(`Password didnt match`).show();
                cpswd.addClass('error');
                valid = false;
            }

        }

        for(let i=0;i< results.rows.length; i++){
            let data = results.rows[i];

            if(email.val().toLowerCase()==null||email.val().toLowerCase()===""){
                emailValid.html(required).show();
                email.addClass('error');
                valid=false;
            }
            else if (!emailRegex.test(email.val().toLowerCase())) {
                emailValid.html(`Invalid Email format i.e. john@mark.com`).show();
                email.addClass('error');
                valid = false;
            }
            else if(email.val().toLowerCase()===data['Email'].toLowerCase() && data['Username'] !== user){
                emailValid.html("Email already registered, Please Login").show();
                email.addClass('error');
                valid = false;
            }

            if(phone.val()==null||phone.val()===""){
                phoneValid.html(required).show();
                phone.addClass('error');
                valid = false;
            }
            else if(!phoneRegex.test(phone.val())){
                phoneValid.html(`Invalid Phone input`).show();
                phone.addClass('error');
                valid = false;
            }
            else if(data['Phone'] === phone && data['User'] !== user){
                phoneValid.html(`Phone Number Already Registered`).show();
                phone.addClass('error');
                valid = false;
            }

            if(pswd.val()==null||pswd.val()===""){
                pswdValid.html(required).show();
                pswd.addClass('error');
                valid = false;
            }
            else if(!pswdRegex.test(pswd.val())){
                pswdValid.html(pswdFormat).show();
                pswd.addClass('error');
                valid = false;
            }

            if(cpswd.val()==null||cpswd.val()===""){
                cpswdValid.html(required).show();
                cpswd.addClass('error');
                valid = false;
            }
            else if(cpswd.val()!==pswd.val()){
                cpswdValid.html(`Password didnt match`).show();
                cpswd.addClass('error');
                valid = false;
            }
        }

        if(valid){
            let Email = $("#updateEmail").val();
            let Phone = $("#updatePhone").val();
            let Username = localStorage.getItem('user');
            let Password = $("#updatePswd").val();
            let userData = new User('','',Email,Phone,Username,Password);
            userdb.update(userData);
            LogOut();
        }
    }

}

//Logout//
function LogOut(){
    localStorage.setItem('user', '');
    $.mobile.changePage($('#LoginPage'));
    $('#frmLogin')[0].reset();
}

function CheckUserLogin(){
    let page = this.id;
    let user = localStorage.getItem('user');
    if(user===""|| user==null){
        LogOut();
    }else if(page === "btnSignin" && user !== ""){
        $.mobile.changePage($('#UserPage'));
    }else{
        switch (page){
            case "MenuPage" : $.mobile.changePage($('#MenuPage'));
            break;
            case "SettingsPage" : $.mobile.changePage($('#SettingsPage'));
            break;
        }
    }
}