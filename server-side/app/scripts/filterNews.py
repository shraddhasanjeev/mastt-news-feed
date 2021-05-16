import sys
from rake_nltk import Rake

news_data = sys.argv[1]
# print("output from python")
# print(news_data)



rake_nltk_var = Rake()

rake_nltk_var.extract_keywords_from_text(news_data)
keyword_extracted = rake_nltk_var.get_ranked_phrases()

print(keyword_extracted)