import swal from "sweetalert";

export const reConfirm = (recheck, handleFun, warningText) => {
  const { file } = recheck;
  if (file) {
    swal({
      title: "Are you sure?",
      text: warningText,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleFun();
      }
    });
  } else {
    swal({
      title: "Warning",
      text: warningText,
      icon: "warning",
      button: true,
    });
  }
};
