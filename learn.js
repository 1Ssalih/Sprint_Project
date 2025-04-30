const topicsData = {
  html: {
    title: "HTML Basics",
    subTopics: [
      {
        name: "Document Structure",
        detail: `HTML (HyperText Markup Language) forms the backbone of every web page. A proper HTML document starts with <code>&lt;!DOCTYPE html&gt;</code> to define the HTML5 standard, followed by the <code>&lt;html&gt;</code> root tag. Inside, the <code>&lt;head&gt;</code> section contains metadata like the page title, character encoding, and links to stylesheets or scripts, while the <code>&lt;body&gt;</code> includes the actual visible content. Structuring content semantically with appropriate tags ensures better accessibility, SEO, and maintainability.`
      },
      {
        name: "Headings & Paragraphs",
        detail: `HTML offers six levels of headings, <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>, which represent the hierarchical structure of content. <code>&lt;h1&gt;</code> is typically used for the main title. Paragraphs are created using the <code>&lt;p&gt;</code> tag and are essential for grouping text into logical blocks. Semantic structuring using headings and paragraphs improves accessibility, readability, and machine interpretation of content.`
      },
      {
        name: "Links & Images",
        detail: `The <code>&lt;a&gt;</code> tag creates hyperlinks with the <code>href</code> attribute pointing to the destination. Links can be internal, external, or anchor-based. The <code>&lt;img&gt;</code> tag embeds images and uses <code>src</code> for the image path and <code>alt</code> for alternative text. Providing alt text ensures accessibility for users relying on screen readers and improves SEO.`
      },
      {
        name: "Lists & Tables",
        detail: `HTML provides ordered (<code>&lt;ol&gt;</code>) and unordered (<code>&lt;ul&gt;</code>) lists, both using <code>&lt;li&gt;</code> to define list items. Tables are created using <code>&lt;table&gt;</code>, and structured with <code>&lt;tr&gt;</code> (table row), <code>&lt;td&gt;</code> (table data), and <code>&lt;th&gt;</code> (table header). Additional semantic tags like <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and <code>&lt;tfoot&gt;</code> help improve accessibility and organization of tabular data.`
      }
    ]
  },

  css: {
    title: "CSS Basics",
    subTopics: [
      {
        name: "Selectors",
        detail: `CSS selectors determine which HTML elements a style rule applies to. The most common types include element selectors (e.g., <code>p</code>), class selectors (e.g., <code>.className</code>), ID selectors (e.g., <code>#id</code>), and attribute selectors (e.g., <code>input[type='text']</code>). You can also use pseudo-classes like <code>:hover</code> and pseudo-elements like <code>::before</code>.`
      },
      {
        name: "Box Model",
        detail: `The box model defines how elements are visually displayed and spaced. It consists of four parts: <strong>content</strong> (the actual text or image), <strong>padding</strong> (space around content), <strong>border</strong> (edge around padding), and <strong>margin</strong> (space outside the border). Proper understanding of the box model is crucial for layout design.`
      },
      {
        name: "Typography & Colors",
        detail: `CSS allows control over font styles and color schemes. Properties like <code>font-family</code>, <code>font-size</code>, <code>line-height</code>, and <code>text-align</code> affect how text appears. Colors can be set using keywords (e.g., <code>red</code>), hex values (<code>#ff0000</code>), <code>rgb()</code>, or <code>hsl()</code>.`
      },
      {
        name: "Layouts & Positioning",
        detail: `CSS offers several layout techniques: <code>position</code> (static, relative, absolute, fixed), <code>float</code>, <code>flexbox</code>, and <code>grid</code>. Flexbox provides efficient one-dimensional alignment, while CSS Grid handles two-dimensional layouts with precision. These systems are essential for responsive design.`
      }
    ]
  },

  js: {
    title: "JavaScript Basics",
    subTopics: [
      {
        name: "Variables & Data Types",
        detail: `JavaScript supports three keywords for variable declaration: <code>var</code>, <code>let</code>, and <code>const</code>. Use <code>let</code> for mutable variables and <code>const</code> for constants. Data types include primitives like <code>string</code>, <code>number</code>, <code>boolean</code>, and reference types like <code>objects</code> and <code>arrays</code>.`
      },
      {
        name: "Functions & Scope",
        detail: `Functions are reusable blocks of code. You can declare them with the <code>function</code> keyword or use arrow functions (<code>() => { }</code>). Scope determines where variables are accessible — global, function, or block. Closures allow inner functions to access variables from their parent scopes, enabling encapsulation.`
      },
      {
        name: "DOM Manipulation",
        detail: `The DOM (Document Object Model) represents the structure of an HTML page. JavaScript can access and modify DOM elements using methods like <code>document.getElementById()</code>, <code>querySelector()</code>, and <code>classList.add()</code>. These methods allow dynamic updates, user interaction, and animation control.`
      },
      {
        name: "Events & Interactivity",
        detail: `JavaScript responds to user actions via events like <code>click</code>, <code>input</code>, and <code>submit</code>. You can use <code>addEventListener()</code> to handle these events. Prevent default behaviors using <code>event.preventDefault()</code> and control event flow with bubbling and capturing phases.`
      }
    ]
  }
};

$(document).ready(function () {

  $(".topic-btn").click(function () {
    $(".topic-btn").removeClass("active");
    $(this).addClass("active");

    const topicKey = $(this).data("topic");
    const topicInfo = topicsData[topicKey];

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

    $("#subtopic-detail").html(`
      <h2>Sub Topic Detail</h2>
      <p>${sub.detail}</p>
    `);
  });
});
