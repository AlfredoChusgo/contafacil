import 'package:flutter/material.dart';
import 'package:flutter_frontend/users/user_business.dart';
import 'package:flutter_frontend/widgets_tools/snackbar_widget.dart';

class UserCreateScreen extends StatelessWidget {
  final String routeName = 'UserCreateScreen';

  UserCreateScreen({Key? key}) : super(key: key);
  final userController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create User'),
        centerTitle: true,
      ),
      body: Center(
        child: SizedBox(
          width: 500,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text('Register New User'),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: userController,
                  decoration: const InputDecoration(
                    label: Text('Usuario'),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    label: Text('Password'),
                  ),
                ),
              ),
              ElevatedButton(
                  onPressed: () async {
                    if (userController.text.isNotEmpty &&
                        passwordController.text.isNotEmpty) {
                      await UserBusiness().userCreate(
                          user: userController.text,
                          password: passwordController.text);
                      return;
                    }
                    Utils().snackBarWidget(context,
                        message: 'user or password is empty');
                  },
                  child: const Text('register'))
            ],
          ),
        ),
      ),
    );
  }
}
