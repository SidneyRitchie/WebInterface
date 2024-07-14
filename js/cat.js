const getCatPicture = async () => {
  const URL = "https://api.thecatapi.com/v1/images/search";
  const API_KEY = "live_STFcNhhOq0Hurmz7y7BBhTF1e2UsCDwgx4S6nZ2DVZ5ZAnBHClxhVS6xEEKINwpH";

  try {
    const response = await fetch(URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
};
