import { pushUser, getUsers } from "./usersModule.js";

(function () {
  if (
    getUsers().length < 10 &&
    getUsers()[0].getEmail() != "admin123@gmail.com"
  ) {
    addDefultUsers();
    console.log("saved...........");
  } else {
    console.log("not saved........");
  }
})();
// console.log(getUsers());

function addDefultUsers() {
  pushUser(
    110,
    "Mohammad Eldabaa",
    "admin123@gmail.com",
    "admin123",
    "123123",
    "Garbia",
    "male",
    "2002-09-09",
    "Default",
    "010123456789",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );
  pushUser(
    111,
    "Ahmad Mohammad",
    "user1@gmail.com",
    "pass1000",
    "1141722",
    "Kfr Elshekh",
    "male",
    "1987-05-09",
    "X",
    "01061723551",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    112,
    "Mahmoud Ali",
    "user2@gmail.com",
    "pass1001",
    "3022585",
    "Cairo",
    "male",
    "2006-02-13",
    "Friend",
    "01578997277",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    113,
    "Khaled Ibrahim",
    "user3@gmail.com",
    "pass1002",
    "4357419",
    "Cairo",
    "male",
    "1994-07-17",
    "Facebook",
    "01287369128",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    114,
    "Omar Youssef",
    "user4@gmail.com",
    "pass1003",
    "2665317",
    "Behera",
    "male",
    "2008-10-07",
    "Telegram",
    "01040878872",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    115,
    "Hassan Abdallah",
    "user5@gmail.com",
    "pass1004",
    "9538978",
    "Garbia",
    "male",
    "2019-07-27",
    "X",
    "01515415316",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    116,
    "Yassin Tarek",
    "user6@gmail.com",
    "pass1005",
    "8910946",
    "Sharqia",
    "male",
    "1982-05-05",
    "Friend",
    "01267700468",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    117,
    "Saeed Mahmoud",
    "user7@gmail.com",
    "pass1006",
    "3833776",
    "Behera",
    "male",
    "1990-01-02",
    "Telegram",
    "01552669245",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    118,
    "Tarek Gamal",
    "user8@gmail.com",
    "pass1007",
    "6126683",
    "Kfr Elshekh",
    "male",
    "1999-05-07",
    "Facebook",
    "01016163989",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    119,
    "Mostafa Sami",
    "user9@gmail.com",
    "pass1008",
    "1060191",
    "Monofia",
    "male",
    "1980-04-20",
    "Facebook",
    "01545415906",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1110,
    "Nour Eldin",
    "user10@gmail.com",
    "pass1009",
    "2609018",
    "Garbia",
    "male",
    "1990-04-26",
    "Instagram",
    "01133957932",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1111,
    "Ibrahim Saeed",
    "user11@gmail.com",
    "pass1010",
    "3042587",
    "Kfr Elshekh",
    "male",
    "2013-09-03",
    "Friend",
    "01115298060",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1112,
    "Abdelrahman Ahmad",
    "user12@gmail.com",
    "pass1011",
    "3463389",
    "Cairo",
    "male",
    "1981-03-04",
    "Telegram",
    "01017268648",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1113,
    "Mohammad Fouad",
    "user13@gmail.com",
    "pass1012",
    "6603031",
    "Kfr Elshekh",
    "male",
    "2000-04-16",
    "X",
    "01551067995",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1114,
    "Amir Khaled",
    "user14@gmail.com",
    "pass1013",
    "6214530",
    "Behera",
    "male",
    "1980-11-23",
    "Instagram",
    "01067398904",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1115,
    "Alaa Hassan",
    "user15@gmail.com",
    "pass1014",
    "3063830",
    "Sharqia",
    "male",
    "1996-01-11",
    "Telegram",
    "01172696164",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1116,
    "Ayman Farouk",
    "user16@gmail.com",
    "pass1015",
    "2496732",
    "Behera",
    "male",
    "1993-04-19",
    "Friend",
    "01279069926",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1117,
    "Karim Fathy",
    "user17@gmail.com",
    "pass1016",
    "5952695",
    "Cairo",
    "male",
    "2015-08-16",
    "Friend",
    "01592223589",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1118,
    "Hossam Eldin",
    "user18@gmail.com",
    "pass1017",
    "4553692",
    "Monofia",
    "male",
    "2006-02-26",
    "Telegram",
    "01091418874",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1119,
    "Hisham Kamal",
    "user19@gmail.com",
    "pass1018",
    "5077442",
    "Garbia",
    "male",
    "2016-11-02",
    "Friend",
    "01072200241",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1120,
    "Ziad Youssef",
    "user20@gmail.com",
    "pass1019",
    "7557028",
    "Behera",
    "male",
    "2013-01-06",
    "Telegram",
    "01190544674",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1121,
    "Gamal Hany",
    "user21@gmail.com",
    "pass1020",
    "5431441",
    "Garbia",
    "male",
    "1982-10-25",
    "Friend",
    "01563280026",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1122,
    "Sameh Adel",
    "user22@gmail.com",
    "pass1021",
    "4254084",
    "Monofia",
    "male",
    "2016-04-30",
    "Instagram",
    "01156183385",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1123,
    "Anas Mohammad",
    "user23@gmail.com",
    "pass1022",
    "9919110",
    "Kfr Elshekh",
    "male",
    "2008-07-31",
    "Facebook",
    "01112512646",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1124,
    "Sharif Omar",
    "user24@gmail.com",
    "pass1023",
    "6803714",
    "Behera",
    "male",
    "2012-06-09",
    "Facebook",
    "01157661406",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1125,
    "Rami Ibrahim",
    "user25@gmail.com",
    "pass1024",
    "6599050",
    "Behera",
    "male",
    "1988-03-07",
    "X",
    "01552639394",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1126,
    "Waleed Nasser",
    "user26@gmail.com",
    "pass1025",
    "6254958",
    "Garbia",
    "male",
    "2013-11-28",
    "Facebook",
    "01178399101",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1127,
    "Nabil Reda",
    "user27@gmail.com",
    "pass1026",
    "2057847",
    "Behera",
    "male",
    "1989-06-02",
    "Telegram",
    "01048811104",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1128,
    "Mazn Adel",
    "user28@gmail.com",
    "pass1027",
    "1658321",
    "Sharqia",
    "male",
    "2017-03-16",
    "Facebook",
    "01241929419",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1129,
    "Marwan Sami",
    "user29@gmail.com",
    "pass1028",
    "4594401",
    "Cairo",
    "male",
    "2003-11-02",
    "Facebook",
    "01282360750",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1130,
    "Saif Emad",
    "user30@gmail.com",
    "pass1029",
    "7080632",
    "Garbia",
    "male",
    "1980-09-10",
    "X",
    "01222514150",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1131,
    "Basem Ahmad",
    "user31@gmail.com",
    "pass1030",
    "3937692",
    "Behera",
    "male",
    "2003-07-13",
    "Friend",
    "01294207742",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1132,
    "Amr Tarek",
    "user32@gmail.com",
    "pass1031",
    "6381714",
    "Sharqia",
    "male",
    "1999-09-17",
    "Facebook",
    "01228463810",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1133,
    "Nader Saeed",
    "user33@gmail.com",
    "pass1032",
    "7773961",
    "Cairo",
    "male",
    "2002-12-06",
    "Telegram",
    "01291502170",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1134,
    "Yasser Abdallah",
    "user34@gmail.com",
    "pass1033",
    "2348288",
    "Monofia",
    "male",
    "1996-03-19",
    "Friend",
    "01529520165",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1135,
    "Khalil Samer",
    "user35@gmail.com",
    "pass1034",
    "8952269",
    "Behera",
    "male",
    "2017-09-14",
    "Instagram",
    "01271581596",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1136,
    "Hazem Mohammad",
    "user36@gmail.com",
    "pass1035",
    "3256013",
    "Sharqia",
    "male",
    "1981-03-19",
    "X",
    "01065346194",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1137,
    "Tamer Mahmoud",
    "user37@gmail.com",
    "pass1036",
    "2436981",
    "Garbia",
    "male",
    "1985-07-24",
    "Friend",
    "01574278523",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1138,
    "Shady Ibrahim",
    "user38@gmail.com",
    "pass1037",
    "7742666",
    "Cairo",
    "male",
    "2005-02-01",
    "Telegram",
    "01288936957",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1139,
    "Sami Khaled",
    "user39@gmail.com",
    "pass1038",
    "8397503",
    "Monofia",
    "male",
    "2017-10-01",
    "Friend",
    "01079254592",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1140,
    "Sohaib Fouad",
    "user40@gmail.com",
    "pass1039",
    "2415912",
    "Monofia",
    "male",
    "1985-03-25",
    "X",
    "01119888958",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1141,
    "Fady Kamal",
    "user41@gmail.com",
    "pass1040",
    "9326066",
    "Cairo",
    "male",
    "2017-04-10",
    "Instagram",
    "01064353711",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1142,
    "Oday Yassin",
    "user42@gmail.com",
    "pass1041",
    "6405296",
    "Sharqia",
    "male",
    "1989-01-14",
    "Telegram",
    "01011223099",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1143,
    "Malek Ahmad",
    "user43@gmail.com",
    "pass1042",
    "3295215",
    "Garbia",
    "male",
    "1982-02-08",
    "X",
    "01194552979",
    "../assets/imgs/admin/img/ped.png",
    "user"
  );

  pushUser(
    1144,
    "Haitham Sharif",
    "user44@gmail.com",
    "pass1043",
    "5755135",
    "Kfr Elshekh",
    "male",
    "1999-10-22",
    "Instagram",
    "01532990545",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1145,
    "Diaa Taha",
    "user45@gmail.com",
    "pass1044",
    "2836103",
    "Kfr Elshekh",
    "male",
    "2000-08-09",
    "Telegram",
    "01129966917",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1146,
    "Abdelaziz",
    "user46@gmail.com",
    "pass1045",
    "3108914",
    "Cairo",
    "male",
    "2011-07-05",
    "X",
    "01012184036",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1147,
    "Baraa Youssef",
    "user47@gmail.com",
    "pass1046",
    "5633013",
    "Garbia",
    "male",
    "1990-12-02",
    "Facebook",
    "01565773391",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1148,
    "Hammam Khaled",
    "user48@gmail.com",
    "pass1047",
    "2779826",
    "Kfr Elshekh",
    "male",
    "2008-08-19",
    "Telegram",
    "01271549711",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1149,
    "Magdy Sami",
    "user49@gmail.com",
    "pass1048",
    "9433164",
    "Sharqia",
    "male",
    "2001-05-02",
    "X",
    "01088352174",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );

  pushUser(
    1150,
    "Jihad Mohammad",
    "user50@gmail.com",
    "pass1049",
    "9104138",
    "Garbia",
    "male",
    "2017-09-25",
    "Instagram",
    "01573384759",
    "../assets/imgs/admin/img/ped.png",
    "seller"
  );
}
