async function track() {
  const trackingId = document.getElementById("trackingId").value;

  if (!trackingId) {
    alert("Please enter a tracking ID");
    return;
  }

  const payload = {
    trackingId: trackingId
  };

  try {
    const res = await fetch("https://YOUR_BACKEND_ENDPOINT/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    const data = await res.json();

    document.getElementById("result").innerText =
      JSON.stringify(data, null, 2);

  } catch (err) {
    console.error(err);
    document.getElementById("result").innerText =
      "Error: " + err.message;
  }
}
