import argparse
from emotion_predictor import EmotionPredictor

parser = argparse.ArgumentParser()
parser.add_argument('-tweets')
args = parser.parse_args()

tweets = args.tweets

model = EmotionPredictor(classification='ekman', setting='mc', use_unison_model=True)

predictions = model.predict_classes(tweets)
print(predictions, '\n')

probabilities = model.predict_probabilities(tweets)
print(probabilities, '\n')

embeddings = model.embedd(tweets)
print(embeddings, '\n')
