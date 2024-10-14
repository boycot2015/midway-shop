import CryptoJS from 'crypto-js';
const encryptKey = '9ukq&1mwxy156jbp';
// DES加密 Pkcs7填充方式
export const encryptByAES = data => {
  // data = CryptoJS.MD5("copyright." + data + "pms@2016").toString();
  // let encryptKey = randomWord(false, 16)
  const key = CryptoJS.enc.Utf8.parse(encryptKey);
  const secretData = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(secretData, key, {
    iv: CryptoJS.enc.Utf8.parse(encryptKey),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
// DES解密
export const decryptByAES = data => {
  const key = CryptoJS.enc.Utf8.parse(encryptKey);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: CryptoJS.enc.Utf8.parse(encryptKey),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
