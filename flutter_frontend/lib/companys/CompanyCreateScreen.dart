import 'package:flutter/material.dart';
import 'package:flutter_frontend/companys/company_business.dart';
import 'package:flutter_frontend/companys/company_model.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class CompanyCreateScreen extends StatefulWidget {
  final String routeName = 'CompanyCreateScreen';

  const CompanyCreateScreen({Key? key}) : super(key: key);

  @override
  State<CompanyCreateScreen> createState() => _CompanyCreateScreenState();
}

class _CompanyCreateScreenState extends State<CompanyCreateScreen> {
  final nitController = TextEditingController();

  final nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    CompanyModel? companyModel =
    ModalRoute.of(context)!.settings.arguments as CompanyModel?;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Company'),
        centerTitle: true,
      ),
      body: Center(
        child: SizedBox(
          width: 500,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Company'),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: nitController,
                  decoration: InputDecoration(
                    prefix: const Text('Nit: '),
                    label: companyModel != null
                        ? Text('${companyModel.nit!}')
                        : const Text('Nit'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: nameController,
                  decoration: InputDecoration(
                    prefix: const Text('Name: '),
                    label: companyModel != null
                        ? Text(companyModel.name!)
                        : const Text('Name'),
                  ),
                ),
              ),
              companyModel == null
                  ? ElevatedButton(
                onPressed: () async {
                  if (nitController.text.isNotEmpty &&
                      nameController.text.isNotEmpty) {
                    await CompanyBusiness().companyCreate(
                        nit: int.parse(nitController.text),
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
                  if (nitController.text.isNotEmpty &&
                      nameController.text.isNotEmpty) {
                    companyModel.nit = int.parse(nitController.text);
                    companyModel.name = nameController.text;
                    await CompanyBusiness()
                        .companyUpdate(companyModel: companyModel);
                    if(!mounted)return;
                    Navigator.pop(context);
                    return;
                  }
                  Utils().snackBarWidget(context,
                      message: 'Nit or Name is empty');
                },
                child: const Text('Update'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
