//TODO:
//сортировка для языка
array.sort(function(a, b){
  var wordA = a.value.toLowerCase(), wordB = b.value.toLowerCase();
  if (wordA < wordB) //sort string ascending
   return -1;
  if (wordA > wordB)
   return 1;
  return 0; //default return value (no sorting)
 });