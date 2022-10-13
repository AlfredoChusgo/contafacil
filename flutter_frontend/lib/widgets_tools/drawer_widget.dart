import 'package:flutter/material.dart';
import 'package:flutter_frontend/accounting_records/accounting_records_screen.dart';
import 'package:flutter_frontend/companys/company_screen.dart';
import 'package:flutter_frontend/products/product_screen.dart';
import 'package:flutter_frontend/users/user_screen.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          ListTile(
            title: const Text('Users'),
            onTap: () => Navigator.pushReplacementNamed(
                context, const UserScreen().routeName),
          ),
          ListTile(
            title: const Text('Products'),
            onTap: () => Navigator.pushReplacementNamed(
                context, const ProductScreen().routeName),
          ),
          ListTile(
            title: const Text('Companys'),
            onTap: () => Navigator.pushReplacementNamed(
                context, const CompanyScreen().routeName),
          ),
          ListTile(
            title: const Text('Accounting Records'),
            onTap: () => Navigator.pushReplacementNamed(
                context, const AccountingRecordsScreen().routeName),
          ),
        ],
      ),
    );
  }
}
