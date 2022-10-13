import 'package:flutter/material.dart';
import 'package:flutter_frontend/product/product_screen.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          ListTile(
            title: Text('Users'),
            onTap: () {

            },
          ),
          ListTile(
            title: const Text('Products'),
            onTap: ()=>Navigator.pushReplacementNamed(context, const ProductScreen().routeName),
          )
        ],
      ),
    );
  }
}
