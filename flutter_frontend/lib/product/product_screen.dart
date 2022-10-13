import 'package:flutter/material.dart';
import 'package:flutter_frontend/product/product_business.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class ProductScreen extends StatelessWidget {
  final String routeName = 'ProductScreen';

  const ProductScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('List Products'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: ProductBusiness().getProduct(),
        builder: (context, snapshot) => ListView.builder(
          itemCount: 2,
          itemBuilder: (context, index) {
            print(
                '**************************FutureBuilder ListView.Builder $index, ${(snapshot.data)}');
            if (snapshot.hasData) {
              return ListTile(
                title: Text(snapshot.data![index]['name']),
                subtitle: const Text('code: xxx'),
                leading: const Text('ID'),
                trailing:
                    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
                onTap: () {
                  Utils().snackBarWidget(context, message: 'NameProduct');
                },
              );
            }
            if (snapshot.hasError) {
              Utils().snackBarWidget(context,
                  message: 'Error 500: ${snapshot.error}');
            }

            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
