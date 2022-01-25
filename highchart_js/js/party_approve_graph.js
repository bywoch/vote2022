var partyMiniArray = [
  "더불어민주당",
  "국민의힘",
  "정의당",
  "국민의당",
  "열린민주당",
];

var partyApprove = [
  {
    party: "더불어민주당",
  },
  {
    party: "국민의힘",
  },
  {
    party: "정의당",
  },
  {
    party: "국민의당",
  },
  {
    party: "열린민주당",
  },
];

function setPartyApproveGraph() {
  var partyApproveHtml = "";
  $.each(partyMiniArray, function (i, d) {
    if (d == "국민의당") {
      d = "국민의당2";
    }
  });
}
function openPartyApproveModal(party, approve) {
  $(".party-approve-modal").fadeIn();
  $(".party-approve-modal").css("top", mouseY - 10);
  $(".party-approve-modal").css("left", mouseX + 20);
  $(".party-text").html(party);
  $(".party-approve").html(" " + approve + "%");
}
function closePartyApproveModal() {
  $(".party-approve-modal").fadeOut();
}
