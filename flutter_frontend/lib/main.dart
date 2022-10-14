
import 'package:flutter/material.dart';
import 'package:flutter_frontend/accounting_records/accounting_records_screen.dart';
import 'package:flutter_frontend/companys/company_screen.dart';
import 'package:flutter_frontend/products/product_screen.dart';
import 'package:flutter_frontend/users/user_create_screen.dart';
import 'package:flutter_frontend/users/user_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(

        primarySwatch: Colors.blue,
      ),
      initialRoute: const UserScreen().routeName,
      routes: {
        ///User Screen
        const UserScreen().routeName: (context) => const UserScreen(),
        UserCreateScreen().routeName: (context) => UserCreateScreen(),

        ///Product Screen
        const ProductScreen().routeName: (context) => const ProductScreen(),

        ///Company Screen
        const CompanyScreen().routeName: (context) => const CompanyScreen(),

        ///Accounting Records Screen
        const AccountingRecordsScreen().routeName: (context) => const AccountingRecordsScreen(),
      },
    );
  }
}