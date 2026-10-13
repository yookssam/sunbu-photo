function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), data.mimeType, data.fileName);
    
    // 구글 드라이브 루트 폴더(또는 지정 폴더)에 파일 저장
    var folder = DriveApp.getFolderById("1g3qg_0o8MQFEkM8CoibmpC8eRThNO8z_");
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 다운로드 가능 URL 반환
    var fileUrl = "https://drive.google.com/uc?export=download&id=" + file.getId();
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      url: fileUrl
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}