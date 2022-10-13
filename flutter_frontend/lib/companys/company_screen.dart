import 'package:flutter/material.dart';
import 'package:flutter_frontend/companys/company_business.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class CompanyScreen extends StatelessWidget {
  final String routeName = 'CompanyScreen';

  const CompanyScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      appBar: AppBar(
        title: const Text('List Company'),
        centerTitle: true,
      ),
      body: FutureBuilder(
        future: CompanyBusiness().getCompanys(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            Utils().snackBarWidget(context,
                message: 'Error 500: ${snapshot.error}');
          }
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text("${snapshot.data![index]['name']}"),
                  subtitle: Text("${snapshot.data![index]['nit']}"),
                  leading: Text("${snapshot.data![index]['id']}"),
                  trailing: IconButton(
                      onPressed: () {}, icon: const Icon(Icons.edit)),
                  onTap: () {
                    Utils().snackBarWidget(context,
                        message:
                        "ID: ${snapshot.data![index]['id']}\nName: ${snapshot.data![index]['name']}");
                  },
                );
              },
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
