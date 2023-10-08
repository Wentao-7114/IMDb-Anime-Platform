import gradio as gr

def predict_anime_rating(features):
    # Your predictive model logic here
    predicted_rating = model.predict([features])
    return predicted_rating

iface = gr.Interface(
    fn=predict_anime_rating,
    inputs="text",
    outputs="text"
)

iface.launch()