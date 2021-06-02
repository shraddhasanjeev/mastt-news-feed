import sys
import json
from warnings import catch_warnings
from nltk import tokenize
from operator import itemgetter
import math
# import nltk
# nltk.download('stopwords')
# nltk.download('wordnet')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
import operator
from rake_nltk import Rake
import numpy as np
import spacy
from rake_nltk import Metric, Rake

def preprocess_news_data(news_data):
    #convert data to lower case
    news_data = np.char.lower(news_data)

    #remove punctuations
    symbols = "!\"#$%&()*+-./:;<=>?@[\]^_`{|}~"
    for i in range(len(symbols)):
        news_data = np.char.replace(news_data, symbols[i], ' ')
    
    news_data = np.char.replace(news_data, "  ", " ")
    news_data = np.char.replace(news_data, ',', '')
    news_data = np.char.replace(news_data, "'", "")
    
    # print(news_data)
    #removing stop words and single words then stemming the words
    stop_words = stopwords.words('english')
    stemmer= PorterStemmer()
    lemmatizer = WordNetLemmatizer()
    words = word_tokenize(str(news_data))
    processed_news_data = ""
    for w in words:
        if w not in stop_words and len(w) > 1:
            # processed_news_data = processed_news_data + " " + stemmer.stem(w)
            processed_news_data = processed_news_data + " " + lemmatizer.lemmatize(w)
            # processed_news_data = processed_news_data + " " + w

    return word_tokenize(str(processed_news_data))

def calculate_tf(total_words):
    total_words_len = len(total_words)
    tf_score = {}
    for each_word in total_words:
        if each_word in tf_score:
            tf_score[each_word] += 1
        else:
            tf_score[each_word] = 1

    # Dividing by total_word_length for each dictionary element
    tf_score.update((x, y/int(total_words_len)) for x, y in tf_score.items())
    return tf_score

def check_sent(word, sentences): 
    final = [all([w in x for w in word]) for x in sentences] 
    sent_len = [sentences[i] for i in range(0, len(final)) if final[i]]
    return int(len(sent_len))

def calculate_idf(total_words, total_sentences):
    total_sent_len = len(total_sentences)
    idf_score = {}
    for each_word in total_words:
        if each_word in idf_score:
            idf_score[each_word] = check_sent(each_word, total_sentences) + 1
        else:
            idf_score[each_word] = 1

    # Performing a log and divide
    idf_score.update((x, math.log(int(total_sent_len)/y)) for x, y in idf_score.items())

    return idf_score

def get_top_n(dict_elem, n):
    result = dict(sorted(dict_elem.items(), key = itemgetter(1), reverse = True)[:n]) 
    return result

def tfidf(news_data):
    news_descriptions = {}
    for i in range (len(news_data["articles"])):
        if (news_data["articles"][i]["title"] != None and news_data["articles"][i]["description"] != None):
            # print(news_data["articles"][i]["title"] + news_data["articles"][i]["description"])
            news_item = news_data["articles"][i]["title"] + news_data["articles"][i]["description"]
            total_sentences = tokenize.sent_tokenize(news_item)
            total_words = preprocess_news_data(news_item)
            tf_score = calculate_tf(total_words)
            # print(tf_score)
            idf_score = calculate_idf(total_words,total_sentences)
            # print(idf_score)
            tf_idf_score = {key: tf_score[key] * idf_score.get(key, 0) for key in tf_score.keys()}
            # print(tf_idf_score)
            # print(get_top_n(tf_idf_score, 5))
            news_descriptions[i] = tf_idf_score
    return news_descriptions

news_data = json.loads(sys.argv[1])
# print(news_data)
# if(news_data["totalResults"] > 100):
# news_data["totalResults"] = 81
#with open('./NewsData1.txt', 'r', encoding='utf8') as f:
#    news_data = json.load(f)

news_map = tfidf(news_data)
keywords_freq = {}
for x in range(len(news_data)):
    for keyword in news_map[x]:
        if keyword not in keywords_freq:
            keywords_freq[keyword] = 1
        else:
            keywords_freq[keyword] += 1

sorted_list = dict(sorted(keywords_freq.items(), key=operator.itemgetter(1),reverse=True))
# print(get_top_n(sorted_list,20))
keywords_list = get_top_n(sorted_list,20)

# print(keywords_list)

news_match = {}

#calculate jaccard index
for x in range(len(news_data)):
    news_item = news_data["articles"][x]["title"] + news_data["articles"][x]["description"]
    set1 = set(preprocess_news_data(news_item))
    set2 = set(keywords_list)

    jcc = len(set1.intersection(set2)) / len(set1.union(set2))
    news_match[x] = jcc

# print(news_match)

#calculate using spacy 
# nlp = spacy.load("en_core_web_lg")
# keywords_str = ' '.join(map(str, keywords_list))
# keywords_tokens = nlp(keywords_str)
# for x in range(news_data["totalResults"]):
#     news_item = news_data["articles"][x]["title"] + news_data["articles"][x]["description"]
#     news_item = preprocess_news_data(news_item)
#     news_item = ' '.join(map(str, news_item))
#     news_item = nlp(news_item)
#     news_match[x] = news_item.similarity(keywords_tokens)

sorted_news = dict(sorted(news_match.items(), key=operator.itemgetter(1),reverse=True))
result = {}

#remove similar news
# for key,value in sorted_news.items():
#     if value not in result.values():
#         result[key] = value
# top_news =  get_top_n(sorted_news,10)

# dict_keys = top_news.keys()
final_news = []
sorted_news_keys = list(sorted_news.keys())
# print(result.items())
i = 0
while len(final_news) <= 5 and i < len(sorted_news_keys):
    k = sorted_news_keys[i]
    # final_news[news_data["articles"][k]["title"]] = news_data["articles"][k]["description"]
    final_news.append(news_data["articles"][k])
    i+=1

j = json.dumps(final_news)
print(j)
sys.stdout.flush()