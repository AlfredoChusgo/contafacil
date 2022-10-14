import 'package:flutter/material.dart';
import 'package:flutter_frontend/companys/CompanyCreateScreen.dart';
import 'package:flutter_frontend/companys/company_business.dart';
import 'package:flutter_frontend/companys/company_model.dart';
import 'package:flutter_frontend/widgets_tools/drawer_widget.dart';

class CompanyScreen extends StatefulWidget {
  final String routeName = 'CompanyScreen';

  const CompanyScreen({Key? key}) : super(key: key);

  @override
  State<CompanyScreen> createState() => _CompanyScreenState();
}

class _CompanyScreenState extends State<CompanyScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const DrawerWidget(),
      appBar: AppBar(
        title: const Text('List Company'),
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.pushNamed(context, const CompanyCreateScreen().routeName);
          setState(() {});
        },
        child: const Icon(Icons.add_circle_outline),
      ),
      body: FutureBuilder(
        future: CompanyBusiness().getCompanys(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            throw Exception(
                'Error--companyScreen----FutureBuilder: ${snapshot.error}');
          }
          if (snapshot.hasData) {
            List<CompanyModel> companyModel = snapshot.data!;
            return Center(
              child: SizedBox(
                width: 600,
                child: ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text("${companyModel[index].name}"),
                      subtitle: Text("${companyModel[index].nit}"),
                      leading: Text("${companyModel[index].id}"),
                      trailing: IconButton(
                          onPressed: () async {
                            await CompanyBusiness().companyDelete(
                                companyId: companyModel[index].id!);
                            setState(() {});
                          }, icon: const Icon(Icons.delete)),
                      onTap: () async {
                        await Navigator.pushNamed(context, const CompanyCreateScreen().routeName, arguments: companyModel[index]);
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
