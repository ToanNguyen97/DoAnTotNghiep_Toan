'use strict'

export default function translateCharacter (input) {
  if (input == undefined || input == '')
      return '';
  // đổi chữ hoa thành chữ thường
  var slug = input.toLowerCase();

  // đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ị|ĩ/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|ọ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/gi, 'o');
  slug = slug.replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỵ|ỷ|ỹ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/ /gi, '');
  return slug;
}
