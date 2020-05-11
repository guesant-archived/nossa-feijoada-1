const checkFileAPI = () =>
  window.File && window.FileReader && window.FileList && window.Blob;

export default checkFileAPI