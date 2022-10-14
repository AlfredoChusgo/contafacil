import 'package:flutter/material.dart';
import 'package:flutter_frontend/products/product_business.dart';
import 'package:flutter_frontend/products/product_create_screen.dart';
import 'package:flutter_frontend/products/product_model.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';

class ProductScreen extends StatefulWidget {
  final String routeName = 'ProductScreen';

  const ProductScreen({Key? key}) : super(key: key);

  @override
  State<ProductScreen> createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.pushNamed(context, const ProductCreateScreen().routeName);
          setState(() {});
        },
        child: const Icon(Icons.add_circle_outline),
      ),
      appBar: AppBar(
        title: const Text('List Products'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: ProductBusiness().getProduct(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            throw Exception(
                'Error--productScreen----FutureBuilder: ${snapshot.error}');
          }
          if (snapshot.hasData) {
            List<ProductModel> productModel = snapshot.data!;
            return Center(
              child: SizedBox(
                width: 600,
                child: ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text('${productModel[index].name}'),
                      subtitle: Text('${productModel[index].code}'),
                      leading: Text('${productModel[index].id}'),
                      trailing: IconButton(
                          onPressed: () async {
                            await ProductBusiness().productDelete(
                                productId: productModel[index].id!);
                            setState(() {});
                          },
                          icon: const Icon(Icons.delete)),
                      onTap: () async {
                        await Navigator.pushNamed(context, const ProductCreateScreen().routeName, arguments: productModel[index]);
                        setState(() {

                        });
                      },
                    );
                  },
                ),
              ),
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
