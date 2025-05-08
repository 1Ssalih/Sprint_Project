let topicsData = {};

$(document).ready(function () {
  $.getJSON("topics.json", function (data) {
    topicsData = data;
  });

  $(".topic-btn").click(function () {
    $(".topic-btn").removeClass("active");
    $(this).addClass("active");

    const topicKey = $(this).data("topic");
    const topicInfo = topicsData[topicKey];

    if (!topicInfo) return;

    $("#info-title").text(topicInfo.title);

    let listItems = "";
    topicInfo.subTopics.forEach(sub => {
      listItems += `<li class="subtopic-item" data-id="${sub.name}">${sub.name}</li>`;
    });

    $("#info-list").html(listItems);
    $("#info-card").animate({ right: "20px" }, 400);
  });

  $("#close-info-card").click(function () {
    $("#info-card").animate({ right: "-350px" }, 400);
  });

  $(document).on("click", "#info-list li", function () {
    const subtopicName = $(this).data("id");
    const topicKey = $(".topic-btn.active").data("topic");
    const topicInfo = topicsData[topicKey];
    const sub = topicInfo.subTopics.find(s => s.name === subtopicName);

    if (sub) {
      $("#subtopic-detail").html(`
        <h2>${sub.name}</h2>
        <p>${sub.detail}</p>
      `);
    }
  });
});

$(document).ready(function () {
  loadRandomQuote(); // Sayfa yüklendiğinde çalıştır
});

function loadLocalQuote() {
  $.getJSON("quotes.json", function (data) {
    const quote = data[Math.floor(Math.random() * data.length)];
    $(".quote-text").text(`"${quote.content}"`);
    $(".quote-author").text(`— ${quote.author}`);
  });
}

$(document).ready(function () {
  loadLocalQuote();
});

function loadLocalQuote() {
  $.getJSON("quotes.json", function (data) {
    const quote = data[Math.floor(Math.random() * data.length)];
    $(".quote-text").text(`"${quote.content}"`);
    $(".quote-author").text(`— ${quote.author}`);
  });
}

$(document).ready(function () {
  loadLocalQuote();

  setInterval(loadLocalQuote, 7000);
});
