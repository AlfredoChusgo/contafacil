
import 'package:flutter/material.dart';
import 'package:flutter_frontend/accounting_records/accounting_records_screen.dart';
import 'package:flutter_frontend/companys/company_screen.dart';
import 'package:flutter_frontend/products/product_screen.dart';
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
      initialRoute: const ProductScreen().routeName,
      routes: {
        const ProductScreen().routeName: (context) => const ProductScreen(),
        const UserScreen().routeName: (context) => const UserScreen(),
        const CompanyScreen().routeName: (context) => const CompanyScreen(),
        const AccountingRecordsScreen().routeName: (context) => const AccountingRecordsScreen(),
      },
    );
  }
}