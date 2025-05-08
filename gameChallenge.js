let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "default"
  });
  
  
  $('#runCodeBtn').click(function () {
    const userCode = editor.getValue();
    try {
      eval(userCode); 
      Swal.fire("Success!", "Code executed successfully!", "success");
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  });
  
  
  $(function () {
    $("#challengeAccordion").accordion();
  });