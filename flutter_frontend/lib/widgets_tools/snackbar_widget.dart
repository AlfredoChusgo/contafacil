import 'package:flutter/material.dart';

class Utils {
  snackBarWidget(BuildContext context, {required String message}) {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }
}
