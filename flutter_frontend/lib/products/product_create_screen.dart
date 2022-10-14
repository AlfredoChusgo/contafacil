import 'package:flutter/material.dart';
import 'package:flutter_frontend/products/product_business.dart';
import 'package:flutter_frontend/products/product_model.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class ProductCreateScreen extends StatefulWidget {
  final String routeName = 'ProductCreateScreen';

  const ProductCreateScreen({Key? key}) : super(key: key);

  @override
  State<ProductCreateScreen> createState() => _ProductCreateScreenState();
}

class _ProductCreateScreenState extends State<ProductCreateScreen> {

  final codeController = TextEditingController();

  final nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    ProductModel? productModel =
        ModalRoute.of(context)!.settings.arguments as ProductModel?;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Product'),
        centerTitle: true,
      ),
      body: Center(
        child: SizedBox(
          width: 500,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text('Product'),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: codeController,
                  decoration: InputDecoration(
                    prefix: const Text('Code: '),
                    label: productModel != null
                        ? Text(productModel.code!)
                        : const Text('Code'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    prefix: const Text('Name: '),
                    label: productModel != null
                        ? Text(productModel.name!)
                        : const Text('Name'),
                  ),
                ),
              ),
              productModel == null
                  ? ElevatedButton(
                      onPressed: () async {
                        if (codeController.text.isNotEmpty &&
                            nameController.text.isNotEmpty) {
                          await ProductBusiness().productCreate(
                              code: codeController.text,
                              name: nameController.text);
                          return;
                        }
                        Utils().snackBarWidget(context,
                            message: 'code or name is empty');
                      },
                      child: const Text('register'),
                    )
                  : ElevatedButton(
                      onPressed: () async {
                        if (codeController.text.isNotEmpty &&
                            nameController.text.isNotEmpty) {
                          productModel.code = codeController.text;
                          productModel.name = nameController.text;
                          await ProductBusiness()
                              .productUpdate(productModel: productModel);
                          if(!mounted)return;
                          Navigator.pop(context);
                          return;
                        }
                        Utils().snackBarWidget(context,
                            message: 'code or name is empty');
                      },
                      child: const Text('actualizar'),
                    )
            ],
          ),
        ),
      ),
    );
  }
}
