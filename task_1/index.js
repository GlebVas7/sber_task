import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)



function decryptFields(encoded, translations) {
  const decryptedList = [];
  const uniqueIds = new Set();

  encoded.forEach(item => {
    const decryptedItem = {};
    for (const key in item) {
      if (key === 'groupId' || key === 'service' || key === 'formatSize' || key === 'ca') {
        decryptedItem[key] = item[key];
      } else if (key.endsWith('Id')) {
        const translation = translations[item[key]];
        if (translation !== undefined) {
          decryptedItem[key] = translation;
          uniqueIds.add(item[key]);
        }
      } else {
        decryptedItem[key] = item[key];
      }
    }
    decryptedList.push(decryptedItem);
  });

  return { decryptedList, uniqueIds: [...uniqueIds] };
}

const { decryptedList, uniqueIds } = decryptFields(encoded, translations);

console.log("Расшифрованные данные:");
console.log(decryptedList);

console.log("Уникальные Id:");
console.log(uniqueIds);
