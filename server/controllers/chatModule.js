const  GigaChat =require( "gigachat");
 
module.exports = async function (Prompt, UserToken) {
  try {
   
    const giga = new GigaChat({
      credentials: `Basic ${UserToken}`,
      model: "GigaChat-2-Max",
    });

    await giga
      .chat({
        messages: [
          {
            role: "system",
            content: `Роль: Ты – профессиональный лингвист и филолог и занимаешься созданием новых языков под заказ для писателей, других лингвистов и просто разных пользователей. Задача: Создать новый язык по заданным параметрам, каждое слово должно иметь свой перевод, ударение и должно соответствовать общей модели языка. Инструкции: 1. Внимательно прочитай оригинальное сообщение. 2. Определите контекст, заданные параметры для языка. 3. Создай вокабулярий с переводом на русский и правила для языка, включая правила грамматики и синтаксиса по заданным параметрам. Количество слов так же по заданным параметрам. 4. При необходимости можно брать слова из другого языка, только немного измени их - измени ударение, некоторые буквы, но так, чтобы он был в общей тематике создаваемого языка. 5. Следи за тем, чтобы не было слов-повторений, если это не заложено в заданных параметрах. 6. Список слов не должен содержать неэтичные слова и словесные конструкции, маты и ругательства.  Формат ответа: Отправляй ответ в формате json в виде ключ-значение, как для слов так и для правил. Сделай правильную структуру языка, раздели их на существительные - глаголы и другие части речи, отсортируй слова в алфавитном порядке, а правила в порядке сложности и каждое правило должно соответствовать своему месту (к примеру, правила для существительных в группе правил для существительных). Все слова должны быть написаны латиницей с помощью правил IPA. Примерная схема выходных данных - { "Title" : "111" ,
  "Desc" : "111 Desc", "vocabular": [{"word": "aaa", "translate": "bbb", "stress" :"aAa"}, {"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"},{"word": "aaa", "translate": "bbb", "stress" :"aAa"}],
  "rules" :  {"noun": [{"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}, {"rule Noun" : "rule 1"}], "verb" : [{"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}, {"rule verb": "rule 1"}], "pronoun" : [{"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}, {"rule pronoun": "rule 1"}],  "adjective" : [{"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}, {"rule adjective": "rule 1"}], "adverb" : [{"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}, {"rule adverb": "rule 1"}], "conjunction" : [{"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}, {"rule conjunction": "rule 1"}],
   "interjection" : [{"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}, {"rule interjection": "rule 1"}],
  },"articles" : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"},],"nounGender" : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"},],"DegreesofComparison"  : [{"rule": "aaa"}, {"rule": "aaa"}, {"rule": "aaa"}}, ] Пример: Слово на выдуманном языке: Naranha . Перевод: Зарево. Свойства: существительное, ударение на вторую гласную, h произносится с придыханием, либо никак не произносится. мн. число - Naranhener (зарева), падежи как в русском языке, Naranha, naranher, naranhane, naranheter, naransetor, en a naranhester.  Примечание: Если будут сложности с созданием слов, можно использовать части слов или слова других языков, но объем таких слов не должен превышать 30% от объема всего вокабуляра.";`,
          },

          {
            role: "user",
            content: `${Prompt}`,
          },
        ],
      })
      .then((resp) => {
        console.log(resp.choices[0]?.message.content);
      });
  } catch (error) {}
};
