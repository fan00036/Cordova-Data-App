// JavaScript Document
var pages = [];
var numPages = 0;
var pageTime = 20;
var db;
//there are 2 listview. they are going to be stored this array in intfun
var listViews=[];
//there are 2 cancleButtons. they are going to be stored this array in intfun
var cancleButtons;

//there are 2 modal. they are going to be stored this array in intfun
var modals=[];

//creat pageshow customer event;used in addDispatch and in intfunc
var pageshow = document.createEvent("CustomEvent");

pageshow.initEvent("pageShow", false, true);

//this function uses page show event and is used in load page
function addDispatch(num) {
    //num is the value i from the setTimeout call
    //using the value here is creating a closure
    pages[num].dispatchEvent(pageshow);

}
//retrive people data from db, load people list in listview element
function loadPeopleList()
{
    
    var list = listViews[0];//document.querySelector('[data-role="listview"]');
    list.innerHTML = "";
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   
                       trans.executeSql("SELECT * FROM People", [],
                                        function(tx, rs){
                                        
                                        //success
                                        //rs.rows.item(0).name would be the contents of the first row, name column
                                        //rs.rows.length is the number of rows in the recordset
                                        var numPeople = rs.rows.length;
                                        //alert("dfadfa");
                                        for(var i=0; i<numPeople; i++){
                                        var li = document.createElement("li");
                                        
                                        //add and set li's data-ref to its id
                                        //li.createAttribute("data-ref");
                                        li.setAttribute("data-ref",rs.rows.item(i).person_id);
                                        
                                        
                                        //set li's innerHTML to its name
                                        li.innerHTML = rs.rows.item(i).person_name;
                                        //add hammer recognizer
                                        //handle singel tab and db tab
                                        addHammerRecognizer(li);
                                        
                                        list.appendChild(li);
                                        }
                                        console.log("displayed the current contents of the people table");
                                        }, 
                                        function(tx, err){
                                        //error
                                        console.log("transaction to list contents of people failed");
                                        });
                       });
    
}



//retrive Occasion data from db, load Occasion list in listview element
function loadOccasionList()
{
    
    var list = listViews[1];//document.querySelector('[data-role="listview"]');
    list.innerHTML = "";
    
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   
                   trans.executeSql("SELECT * FROM occasions", [],
                                    function(tx, rs){
                                    
                                    //success
                                    //rs.rows.item(0).name would be the contents of the first row, name column
                                    //rs.rows.length is the number of rows in the recordset
                                    var numOccasion = rs.rows.length;
                                    //alert("dfadfa");
                                    for(var i=0; i<numOccasion; i++){
                                    var li = document.createElement("li");
                                    
                                    //add and set li's data-ref to its id
                                    //li.createAttribute("data-ref");
                                    li.setAttribute("data-ref",rs.rows.item(i).occ_id);
                                    
                                    li.innerHTML = rs.rows.item(i).occ_name;
                                    
                                    //add hammer recognizer
                                    //handle singel tab and db tab
                                    addHammerRecognizer(li);
                                    
                                    list.appendChild(li);
                                    }
                                    console.log("displayed the current contents of the occasions table");
                                    },
                                    function(tx, err){
                                    //error
                                    console.log("transaction to list contents of occasions failed");
                                    });
                   });
    
}

//retrive GiftForPeople data from db, load GiftForPeople list in listview element
function loadGiftForPeopleList(peopleID)
{
    
    var list = listViews[2];//document.querySelector('[data-role="listview"]');
    list.innerHTML = "";
    
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   //
                   trans.executeSql("SELECT*\n"

                                    +"FROM\n"
                                    +"gifts AS g\n"
                                    +"INNER JOIN people AS p ON g.person_id = p.person_id\n"
                                    +"INNER JOIN occasions AS o ON g.occ_id = o.occ_id\n"
                                    
                                    
                                    +"WHERE g.person_id=(?)"
                                    
                                    
                                    , [peopleID],
                                    function(tx, rs){
                                    
                                    //success
                                    //rs.rows.item(0).name would be the contents of the first row, name column
                                    //rs.rows.length is the number of rows in the recordset
                                    //get person_name which is the same in the result set
                                    var personName=rs.rows.item(0).person_name;
                                    
                                    
                                    
                                    
                                    var numGift = rs.rows.length;
                                    //alert("dfadfa");
                                    for(var i=0; i<numGift; i++){
                                    var li = document.createElement("li");
                                    
                                    //add and set li's data-ref to its id
                                   
                                    li.setAttribute("data-ref",rs.rows.item(i).gift_id);

                                    li.innerHTML = rs.rows.item(i).gift_idea+"-"+rs.rows.item(i).occ_name;
                                    //add hammer recognizer
                                    //handle singel tab and db tab
                                    addHammerRecognizer(li);
                                    list.appendChild(li);
                                    }
                                    console.log("displayed the current contents of the gifts table");
                                    },
                                    function(tx, err){
                                    //error
                                    console.log("transaction to list contents of gifts failed");
                                    });
                   });
    
}



//retrive GiftForOccasion data from db, load GiftForOccasion list in listview element
function loadGiftForOccasionList(occasionID)
{
   
    var list = listViews[3];//document.querySelector('[data-role="listview"]');
    list.innerHTML = "";
    
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   
                   trans.executeSql("SELECT*\n"
                                    
                                    +"FROM\n"
                                    +"gifts AS g\n"
                                    +"INNER JOIN people AS p ON g.person_id = p.person_id\n"
                                    +"INNER JOIN occasions AS o ON g.occ_id = o.occ_id\n"
                                    
                                    
                                    +"WHERE g.occ_id=(?)"
                                    
                                    
                                    , [occasionID],
                                    function(tx, rs){
                                    
                                    //success
                                    //rs.rows.item(0).name would be the contents of the first row, name column
                                    //rs.rows.length is the number of rows in the recordset
                                    //get occ_name which is the same in the result set
                                    
                                    var occName=rs.rows.item(0).occ_name;
                                    
                                    

                                    
                                    
                                    var numGift = rs.rows.length;
                                    //alert("dfadfa");
                                    for(var i=0; i<numGift; i++){
                                    var li = document.createElement("li");
                                    
                                    //add and set li's data-ref to its id
                                    
                                    li.setAttribute("data-ref",rs.rows.item(i).gift_id);
                                    
                                    
                                    li.innerHTML = rs.rows.item(i).gift_idea+"-"+rs.rows.item(i).person_name;
                                    
                                    //add hammer recognizer
                                    //handle singel tab and db tab
                                    addHammerRecognizer(li);
                                    list.appendChild(li);
                                    }
                                    console.log("displayed the current contents of the gifts table");
                                    },
                                    function(tx, err){
                                    //error
                                    console.log("transaction to list contents of gifts failed");
                                    });
                   });
    
}

//function is used for navigation, take page id as parameter.
//load data
function loadPage(url) {
    if (url == null) {
        //people-list page first call
        pages[0].className = 'active show';
        
        history.replaceState(null, null, "#people-list");
    } else {
        for (var i = 0; i < numPages; i++) {
            pages[i].className = "hidden";
            //get rid of all the hidden classes
            //but make them display block to enable anim.
            if (pages[i].id == url) {
               
                //load list with data
                if(openDB())
                {
                    
                    //if it is people-list page, load people list;if is occasion-list page, load occasion list.
                    switch(url)
                    {
                        case "people-list":
                            loadPeopleList();
                        break;
                        case "occasion-list":
                            loadOccasionList();
                        break;

                        
                        
                    }
                    
                }
                closeDB();
                
                //add active to the proper page with pageTime period time in
                setTimeout(addDispatch, pageTime, i);
                
                history.pushState(null, null, "#" + url);
                
            }
        }
        
    }
};
//show giftforPeople page with specified people data
//take peopleID as parameter
function showGiftForPeople(peopleID)
{
    loadPage("gifts-for-person");
    loadGiftForPeopleList(peopleID);
}



//show GiftForOccasion with specified people data
//take occasionID as parameter
function showGiftForOccasion(occasionID)
{
    
    loadPage("gifts-for-occasion");
    loadGiftForOccasionList(occasionID);
}

//Hammer control single tap and double tap on people list item and occasion list item
function addHammerRecognizer(theElement) {
    
    // We create a manager object, which is the same as Hammer(), but without 	  //the presetted recognizers.
    //alert("dfadfad");
    var mc = new Hammer.Manager(theElement);
    
    
    // Tap recognizer with minimal 2 taps
    mc.add(new Hammer.Tap({
                          event: 'doubletap',
                          taps: 2,
                          threshold:5,
                          posThreshold:30
                          }));
    // Single tap recognizer
    mc.add(new Hammer.Tap({
                          event: 'singletap',
                          taps:1,
                          threshold:5
                          }));
    
    
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    mc.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    mc.get('singletap').requireFailure('doubletap');
    
    //open gift for people page
    mc.on("singletap", function (ev) {
          
          
          //detect current page id
          
          var pageID=ev.target.parentNode.parentNode.getAttribute("id");
          var table;
          var ID=ev.target.getAttribute("data-ref");
          var text=ev.target.innerHTML;
          
          
          //retrive record from either table people or occassion depending on current page id
          
          //use date-ref in query to find record
          switch(pageID)
          {
            case "people-list":
                showGiftForPeople(ID);
                //change page title
        
                document.querySelector("#title-gift-for-person").innerHTML="Gift for "+text;
          
                //pass ID and text to add button as attribute in gift for people page
          
                //this step is very important
                //add special attribute to add button in order to pass data to the page opened by clicking the button
                var btnAddGiftForPerson=document.querySelector("#btnAddGiftForPerson");
                btnAddGiftForPerson.setAttribute("data-ref-id",ID);
                btnAddGiftForPerson.setAttribute("data-ref-name",text);
          
                break;
            case "occasion-list":
          
                showGiftForOccasion(ID);
          
                //change page title
          
                document.querySelector("#title-gift-for-occasion").innerHTML="Gift for "+text;
          
                //pass ID and text to add button as attribute in gift for people page
          
                //this step is very important
                //add special attribute to add button in order to pass data to the page opened by clicking the button
                var btnAddGiftForOccasion=document.querySelector("#btnAddGiftForOccasion");
                btnAddGiftForOccasion.setAttribute("data-ref-id",ID);
                btnAddGiftForOccasion.setAttribute("data-ref-name",text);
                break;


          
          
          }
          
          });
    mc.on("doubletap", function (ev) {
          
          //detect current page id
          
          var pageID=ev.target.parentNode.parentNode.getAttribute("id");
          
          var ID=ev.target.getAttribute("data-ref");

          

          //retrive record from either table people or occassion depending on current page id
          
          
          //use date-ref in query to find record
          switch(pageID)
          {
          case "people-list":
            //delete item from people table
            deletePersonByID(ID);
            loadPage("people-list");
          
          
          break;
          case "occasion-list":
          //delete item from people table
          deleteOccasionByID(ID);
          loadPage("occasion-list");
          
          
          break;
          case "gifts-for-person":
          
          //delete item from people table
          deleteGiftByID(ID);
          
          loadPage("gifts-for-person");
          
          var btnAddGiftForPerson=document.querySelector("#btnAddGiftForPerson");
          
          var personID=btnAddGiftForPerson.getAttribute("data-ref-id");

          
          loadGiftForPeopleList(personID);
          
          
          break;
          case "gifts-for-occasion":

          //delete item from people table
          deleteGiftByID(ID);
          
          loadPage("gifts-for-occasion");
          
          var btnAddGiftForOccasion=document.querySelector("#btnAddGiftForOccasion");
          
          var occasionID=btnAddGiftForOccasion.getAttribute("data-ref-id");
          
          
          loadGiftForOccasionList(occasionID);
          
          
          break;
          
          
          
          }
          
          });
    
};


//handle pageshow event to change page to active, used in intfunc;
function handlePageShow(ev) {
    ev.target.className = "active";
}

//check if DB is exist, if no create one. return true; -----todo catch error
//used in load page.
function openDB()
{
    
    
    // create database gift or open it
    db = openDatabase('giftDB', '1.0', 'gift DB', 1024*1024);
    
    db.transaction(
                   
                   
                   //create table and insert some record
                   function(trans)
                   {
                        //use this for testing and clean up table
                        //trans.executeSql('DROP TABLE IF EXISTS people');
                   
                        trans.executeSql('CREATE TABLE IF NOT EXISTS people(person_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name TEXT)', [],
                                    function(trans, rs)
                                    {
                                         
                                        //do something if it works
                                        console.log("Table people is created or exist");
                                        //inset record for testing
//                                        trans.executeSql('INSERT INTO People(person_name) VALUES(?)',
//                                                         ["Helen"],
//                                                         function(trans, rs)
//                                                         {
//                                                            console.log("Added row in People");
//                                                         },
//                                                         function(trans, err)
//                                                         {
//                                                            //failed to run query
//                                                            console.log( err.message);
//                                                         }
//                                                         
//                                                         );
                                    
                                    },
                                    function(trans, err)
                                    {
                                        //failed to run query
                                        console.log( err.message);
                                         return false;
                                        
                                    }
                                    );
                   
                   //use this for testing and clean up table
                   //trans.executeSql('DROP TABLE IF EXISTS occasions');
                   trans.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name TEXT)', [],
                                    function(trans, rs)
                                    {
                                    
                                    //do something if it works
                                    console.log("Table occasions is created or exist");
                                    //inset record for testing
                                    //                                        trans.executeSql('INSERT INTO People(person_name) VALUES(?)',
                                    //                                                         ["Helen"],
                                    //                                                         function(trans, rs)
                                    //                                                         {
                                    //                                                            console.log("Added row in People");
                                    //                                                         },
                                    //                                                         function(trans, err)
                                    //                                                         {
                                    //                                                            //failed to run query
                                    //                                                            console.log( err.message);
                                    //                                                         }
                                    //
                                    //                                                         );
                                    
                                    },
                                    function(trans, err)
                                    {
                                    //failed to run query
                                    console.log( err.message);
                                    return false;
                                    
                                    }
                                    );
                   //use this for testing and clean up table
                   //trans.executeSql('DROP TABLE IF EXISTS gifts');
                   //sqlite use integer to store true(1) and false(0) instead of boolean
                   trans.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER,occ_id INTEGER,gift_idea TEXT,purchased INTEGER)', [],
                                    function(trans, rs)
                                    {
                                    
                                    //do something if it works
                                    console.log("Table gifts is created or exist");
                                    //inset record for testing
//                                                                            trans.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea) VALUES(?,?,?)',
//                                                                                             [1,1,"bike"],
//                                                                                             function(trans, rs)
//                                                                                             {
//                                                                                                console.log("Added row in gifts");
//                                                                                             },
//                                                                                             function(trans, err)
//                                                                                             {
//                                                                                                //failed to run query
//                                                                                                console.log( err.message);
//                                                                                             }
//                                    
//                                                                                             );
                                    
                                    },
                                    function(trans, err)
                                    {
                                    //failed to run query
                                    console.log( err.message);
                                    return false;
                                    
                                    }
                                    );
                   
                   },
                   //function will be called when an error occurred
                   function(err)
                   {
                    console.log("Error processing SQL: "+err.code);
                    return false;
                   
                   },
                   //function will be called when process succeed
                   function()
                   {
                    console.log("success!");
                   
                   }
                   
                   
                   
                   
                   );
    
    return true;
    
    
    
    
};
//close database
function closeDB()
{
    
}
//save new people to database
function saveNewPeople(newPeople)
{
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                            transaction.executeSql('INSERT INTO people(person_name) VALUES(?)',
                                              [ newPeople ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                                if (!resultSet.rowsAffected)
                                                {
                                                    // Previous insert failed. Bail.
                                                    console.log('No rows affected!');
                                                   
                                                }
                                                //alert('insert ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                                   alert( err.message);
                                              }
                                              );
                       },
                       
                      
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};

//delete person by given ID
function deletePersonByID(personID)
{
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                       transaction.executeSql('DELETE FROM people WHERE person_id = (?)',
                                              [ personID ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                              if (!resultSet.rowsAffected)
                                              {
                                              // Previous insert failed. Bail.
                                              console.log('No rows affected!');
                                              
                                              }
                                              //alert('delete ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                              alert( err.message);
                                              }
                                              );
                       },
                       
                       
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};
//save new occasion to database
function saveNewOccasion(newOccasion)
{
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                       transaction.executeSql('INSERT INTO occasions(occ_name) VALUES(?)',
                                              [ newOccasion ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                              if (!resultSet.rowsAffected)
                                              {
                                              // Previous insert failed. Bail.
                                              console.log('No rows affected!');
                                              
                                              }
                                              //alert('insert ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                              alert( err.message);
                                              }
                                              );
                       },
                       
                       
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};

//delete occasion by given ID
function deleteOccasionByID(occasionID)
{
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                       transaction.executeSql('DELETE FROM occasions WHERE occ_id = (?)',
                                              [ occasionID ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                              if (!resultSet.rowsAffected)
                                              {
                                              // Previous insert failed. Bail.
                                              console.log('No rows affected!');
                                              
                                              }
                                              //alert('delete ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                              alert( err.message);
                                              }
                                              );
                       },
                       
                       
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};



//save New Gift to database with parameters :(personID,occasionID,gift_idea)

function saveNewGift(personID,occasionID,gift_idea)
{
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                       transaction.executeSql('INSERT INTO gifts(person_id,occ_id,gift_idea) VALUES(?,?,?)',
                                              [ personID,occasionID,gift_idea ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                              if (!resultSet.rowsAffected)
                                              {
                                              // Previous insert failed. Bail.
                                              console.log('No rows affected!');
                                              
                                              }
                                              //alert('insert ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                              alert( err.message);
                                              }
                                              );
                       },
                       
                       
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};

//delete occasion by given ID
function deleteGiftByID(giftID)
{
    
    if(openDB())
    {
        db.transaction(
                       function (transaction)
                       {
                       transaction.executeSql('DELETE FROM gifts WHERE gift_id = (?)',
                                              [ giftID ],
                                              //execute sql sussessfully
                                              function (transaction, resultSet)
                                              {
                                              if (!resultSet.rowsAffected)
                                              {
                                              // Previous insert failed. Bail.
                                              console.log('No rows affected!');
                                              
                                              }
                                              //alert('delete ID was '+resultSet.insertId);
                                              },
                                              //execute sql failly
                                              function (transaction, err)
                                              {
                                              alert( err.message);
                                              }
                                              );
                       },
                       
                       
                       //function will be called when an transaction error occurred
                       function(err)
                       {
                       console.log("Error processing SQL: "+err.code);
                       
                       
                       },
                       //function will be called when process succeed
                       function()
                       {
                       console.log("success!");
                       
                       }
                       
                       );
        
        
        
    }
    
    closeDB();
    
    
    
};


//load Occasions To DropDownMenu when add gift_for_people overlay shows
//get occasions from db
function loadOccasionsToDropDownMenu()
{
    
    var select = document.querySelector('#list-per-occ');
    //clear all options
    while(select.options.length > 0)
        select.remove(0);
    
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   
                   trans.executeSql("SELECT * FROM occasions", [],
                                    function(tx, rs){
                                    
                                    //success
                                    //rs.rows.item(0).name would be the contents of the first row, name column
                                    //rs.rows.length is the number of rows in the recordset
                                    var numOccasion = rs.rows.length;
                                    
                                    for(var i=0; i<numOccasion; i++){
                                    var opt = document.createElement("option");
                                    opt.value= rs.rows.item(i).occ_id;
                                    opt.innerHTML = rs.rows.item(i).occ_name; // whatever property it has
                                    
                                    // then append it to the select element
                                    select.appendChild(opt);
                                    }
                                    console.log("displayed the current contents of the occasions table");
                                    },
                                    function(tx, err){
                                    //error
                                    console.log("transaction to list contents of occasions failed");
                                    });
                   });
    
}



//load People To DropDownMenu when add gift_for_occasion overlay shows
//get People from db
function loadPeopleToDropDownMenu()
{
    
    var select = document.querySelector('#list-per-occ');
    //clear all options
    while(select.options.length > 0)
        select.remove(0);
    
    //clear out the list before displaying everything
    db.transaction(function(trans){
                   
                   trans.executeSql("SELECT * FROM people", [],
                                    function(tx, rs){
                                    
                                    //success
                                    //rs.rows.item(0).name would be the contents of the first row, name column
                                    //rs.rows.length is the number of rows in the recordset
                                    var numPeople = rs.rows.length;
                                    
                                    for(var i=0; i<numPeople; i++){
                                    var opt = document.createElement("option");
                                    opt.value= rs.rows.item(i).person_id;
                                    opt.innerHTML = rs.rows.item(i).person_name; // whatever property it has
                                    
                                    // then append it to the select element
                                    select.appendChild(opt);
                                    }
                                    console.log("displayed the current contents of the occasions table");
                                    },
                                    function(tx, err){
                                    //error
                                    console.log("transaction to list contents of occasions failed");
                                    });
                   });
    
}


//hander BtnAddPeople or btnAddOccasion is Clicked-open add new people or new occasion overlay
function handerBtnAddClick(ev)
{
    
    //show overlay
    //document.querySelector("[data-role=modal]").style.display = "block";
    document.querySelector("[data-role=overlay]").style.display = "block";
    
    
    
    //get trigger button id
    var btnID = ev.target.getAttribute("id");
    //detect button ID, determin open overlay is for adding people or occasion
    switch(btnID)
    {
        case "btnAddPeople":
        //show modal session on top of overlay
        modals[0].style.display = "block";
        //change title
        document.querySelector('#modalTitle').innerHTML="New person";
        //change placeholder text
        document.querySelector('#new-per-occ').setAttribute('placeholder','Person name');

        //change modal overlay id in order to specify the overlay is for peopel
        //this step is very important!!!
        document.querySelector("[data-role=modal]").setAttribute('id','add-person');
        break;
        case "btnAddOccasion":
        //show modal session on top of overlay
        modals[0].style.display = "block";
        document.querySelector('#modalTitle').innerHTML="New occasion";
        document.querySelector('#new-per-occ').setAttribute('placeholder','Occasion name');

        //change modal overlay id in order to specify the overlay is for peopel
        //this step is very important!!!
        document.querySelector("[data-role=modal]").setAttribute('id','add-occasion');
        break;
        case "btnAddGiftForPerson":
            //show modal session on top of overlay
            modals[1].style.display = "block";
            
            //get button's special attributes which are added in loadGiftForPeople function
            var id=ev.target.getAttribute("data-ref-id");
            var name=ev.target.getAttribute("data-ref-name");
            
            //modify current modal's title which is the innerHTML of p element
            //find p element which is the page title also current model's child node
            var p=modals[1].childNodes[1];
            //modify <p>element
            p.innerHTML="Gift for "+name;
            
            //load occasion list to combobox as option items
            loadOccasionsToDropDownMenu();
            
            //this step is very important
            //pass the person id to save button in add gift page as its attribute
            //when save button is clicked, the id will be used to update table in handleBtnSaveGift
            var btnSaveGift=document.querySelector("#btnSaveGift");
            btnSaveGift.setAttribute("data-ref-id",id);
            //this attribute is also usefull to determin which id is peole id or occasion id
            btnSaveGift.setAttribute("data-ref-frompage","saveGiftForPeople");
            
            //change modal overlay id in order to specify the overlay is for peopel
            //this step is very important!!!
            
            break;
        case "btnAddGiftForOccasion":
            //show modal session on top of overlay
            modals[1].style.display = "block";
            
            //get button's special attributes which are added in loadGiftForPeople function
            var id=ev.target.getAttribute("data-ref-id");
            var name=ev.target.getAttribute("data-ref-name");
            
            //modify current modal's title which is the innerHTML of p element
            //find p element which is the page title also current model's child node
            var p=modals[1].childNodes[1];
            //modify <p>element
            p.innerHTML="Gift for "+name;
            
            //load occasion list to combobox as option items
            loadPeopleToDropDownMenu();
            
            //this step is very important
            //pass the person id to save button in add gift page as its attribute
            //when save button is clicked, the id will be used to update table in handleBtnSaveGift
            var btnSaveGift=document.querySelector("#btnSaveGift");
            btnSaveGift.setAttribute("data-ref-id",id);
            //this attribute is also usefull to determin which id is peole id or occasion id
            btnSaveGift.setAttribute("data-ref-frompage","saveGiftForOccasion");
            
            //change modal overlay id in order to specify the overlay is for peopel
            //this step is very important!!!
            
            break;

        
        
 
        
    }
    
    
}



//hander BtnCancel Click -close add new people or new occasion overlay
function handerBtnCancelClick(ev)
{
    
    //close overlay
    modals[0].style.display = "none";
    modals[1].style.display = "none";
    document.querySelector("[data-role=overlay]").style.display = "none";
 
    
    
}

//handler btnSaveClick - save new people or new occasion and close overlay
function handerBtnSavePersonOccasionClick(ev)
{
    
    
    //close overlay
    modals[0].style.display = "none";
    document.querySelector("[data-role=overlay]").style.display = "none";
    
    //get current overlay id
    var overlayID=ev.target.parentNode.parentNode.parentNode.getAttribute("id");
    //check overlay id,which is specified in handerBtnPeopleClick
    //depend on overlay id, determin if it is to add people or add occasion
    switch(overlayID)
    {
        case "add-person":
            //alert(document.forms[0].elements[0].value);
            saveNewPeople(document.forms[0].elements[0].value);
            //reload people
            loadPage("people-list");
        break;
        case "add-occasion":
            //alert(document.forms[0].elements[0].value);
            saveNewOccasion(document.forms[0].elements[0].value);
            //reload people
            loadPage("occasion-list");
            
        break;
        
    }
    
}
//save new gift to gift table
//since the button attribute data-ref-id can be person id or occasion id
//use another attribut data-ref-frompage to tell
function handleBtnSaveGift(ev)
{
    var frompage=ev.target.getAttribute("data-ref-frompage");
    switch(frompage)
    {
            case "saveGiftForPeople":
            
            var personID=ev.target.getAttribute("data-ref-id");
            var occasionID=document.forms[1].elements[0].value;
            var gift_idea=document.forms[1].elements[1].value;
            //save new gift to db
            saveNewGift(personID,occasionID,gift_idea);
            loadPage("gifts-for-person");
            loadGiftForPeopleList(personID);
            break;
            case "saveGiftForOccasion":
            var occasionID=ev.target.getAttribute("data-ref-id");
            var personID=document.forms[1].elements[0].value;
            var gift_idea=document.forms[1].elements[1].value;
            //save new gift to db
            saveNewGift(personID,occasionID,gift_idea);
            loadPage("gifts-for-occasion");
            loadGiftForOccasionList(occasionID);
            break;
        
    }
    
    //close overlay
    modals[1].style.display = "none";
    document.querySelector("[data-role=overlay]").style.display = "none";
    
    
}


document.addEventListener("deviceready", intfunc, false);

function intfunc() {
    
    
    //inition pages,numpages,listviews,modals
    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    listViews = document.querySelectorAll('[data-role="listview"]');
    modals = document.querySelectorAll('[data-role="modal"]');
    cancleButtons=document.querySelectorAll('.btnCancel');
    
    
    
    
    //load first page
    loadPage("people-list");
    

    
    //add the listener to each page
    for (var p = 0; p < numPages; p++)
    {
        
        //add pageShow event listener with handler which changes page class to active
        pages[p].addEventListener("pageShow", handlePageShow, false);


        
        //add swipe event handler for navigation
		switch(pages[p].getAttribute("id"))
        {
                
            case "people-list":
                Hammer(pages[p]).on("swipeleft", function() {
                                    
                                    loadPage("occasion-list");
                                    
                                    });
            break;
            case "occasion-list":
                Hammer(pages[p]).on("swiperight", function() {
                                loadPage("people-list");
                                    
                                    
                                    });
            break;
            
            
            
        }
        

		
		
    }
    
    //add listener to Add button in People list page
    var btnAddPeople = document.querySelector('#btnAddPeople');
    btnAddPeople.addEventListener("click", handerBtnAddClick);
    
    //add listener to Add button in occassion list page
    var btnAddOccasion = document.querySelector('#btnAddOccasion');
    btnAddOccasion.addEventListener("click", handerBtnAddClick);
    
    
    

    //add listener to Save button on overlay save new item either people or occasion
    var btnSavePersonOccasion = document.querySelector('#btnSavePersonOccasion');
    btnSavePersonOccasion.addEventListener("click", handerBtnSavePersonOccasionClick);
    
    //add listener to btnAddGiftForPerson on gift for people page
    var btnAddGiftForPerson = document.querySelector('#btnAddGiftForPerson');
    btnAddGiftForPerson.addEventListener("click", handerBtnAddClick);
    

    //add listener to btnAddGiftForOccasion on gift for occasion page
    var btnAddGiftForOccasion = document.querySelector('#btnAddGiftForOccasion');
    btnAddGiftForOccasion.addEventListener("click", handerBtnAddClick);
    
    

    
    //add listener to btnSaveGift on save gift for people page
    var btnSaveGift = document.querySelector('#btnSaveGift');
    btnSaveGift.addEventListener("click", handleBtnSaveGift);
    
    
    var btnBackToPerson = document.querySelector('#btnBackToPerson');
    btnBackToPerson.addEventListener("click", handleBtnBack);

    
    var btnBackToOccasion = document.querySelector('#btnBackToOccasion');
    btnBackToOccasion.addEventListener("click", handleBtnBack);

    
    
    //add the listener to each cancle button to dismiss overlay
    for (var i = 0; i < cancleButtons.length; i++)
    {
        
 
        cancleButtons[i].addEventListener("click", handerBtnCancelClick, false);
    }
    
    
    
    
};
//get button id,navigate back to right page
function handleBtnBack(ev)
{
    
    
    switch(ev.target.getAttribute("id"))
    {
            case "btnBackToPerson":
            loadPage("people-list");
            break;
            case "btnBackToOccasion":
            loadPage("occasion-list");
            break;
        
    }
}






