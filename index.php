<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <title>PHP gyakorlás</title>
  <link rel="stylesheet" href="main.css">
</head>

<body>
  <!-- ezt hagyjuk meg a html verziónak -->
  <!--
  <main class="container-lg py-5">
    <section class="row row-cols-1 gy-3 py-3">
      <article class="col p-2">
        <form method="post" id="porog">
          <button type="submit" class="btn btn-success" name="start" id="start">Kezdés</button>
        </form>
      </article>
      <article class="col p-2" id="tippelo">
        <form method="post" class="d-flex flex-column gap-3" id="tipp">
          <label for="tippszo" class="form-label">Válasszon egy betűt</label>
          <input type="text" class="form-control" name="tippszo" id="tippszo" placeholder="Írjon be egy betűt és nyomja meg a 'Pörgetés' gombot!">
          <button type="submit" class="btn btn-primary" name="spin" id="spin">Pörgetés</button>
        </form>
      </article>
      <article class="col p-2" id="megfejtendo"></article>
      <article class="col p-2" id="kiirtertek"></article>
      <article class="col p-2" id="penz"></article>
      <article class="col p-2">
        <form method="post" id="ujra">
          <button type="submit" class="btn btn-warning" name="restart" id="restart">Újrakezdés</button>
        </form>
      </article>
    </section>
  </main>
-->

  <?php

  $section = ['start', 'tippelo', 'megfejtendo', 'kiirtertek', 'penz', 'ujra'];

  print '<main class="container-lg py-5">'."\n";
  print "\t".'<section class="row row-cols-1 gy-3 py-3">'."\n";
  foreach ($section as $article) {
    if ($article === 'tippelo') {
      // a `` közti kiíratásnál nem jelent meg
      print "\t\t".'<article class="col p-2" id="' . $article . '">'."\n\t\t\t".'<form method="post" class="d-flex flex-column gap-3" id="tipp">'."\n\t\t\t\t".'<label for="tippszo" class="form-label">Válasszon egy betűt</label>'."\n\t\t\t\t".'<input type="text" class="form-control" name="tippszo" id="tippszo" placeholder="Írjon be egy betűt és nyomja meg a Pörgetés gombot!">'."\n\t\t\t\t".'<button type="submit" class="btn btn-primary" name="spin" id="spin">Pörgetés</button>'."\n\t\t\t".'</form>'."\n\t\t".'</article>'."\n";
    } elseif ($article === 'start' || $article === 'ujra') {
      print "\t\t".'<article class="col p-2">'."\n\t\t\t".'<form method="post" id="' . (($article === "start") ? "porog" : "ujra") . '">'."\n\t\t\t\t".'<button type="submit" class="btn ' . (($article === "start") ? "btn-success" : "btn-warning") . '" name="' . (($article === "start") ? "start" : "restart") . '" id="' . (($article === "start") ? "start" : "restart") . '">' . (($article === "start") ? "Kezdés" : "Újrakezdés") . '</button>'."\n\t\t\t".'</form>'."\n\t\t".'</article>'."\n";
    } else {
      print "\t\t".'<article class="col p-2" id="' . $article . '"></article>'."\n";
    }
  }
  print "\t".'</section>'."\n";
  print "\t".'<section class="row row-cols-1 gy-3 py-3" id="hiba">';
  // hibaüzenet - karakter vagy betű majd attól függ lehetnek-e számok benne vagy sem
  if (isset($_POST["spin"])) {

    $errors = [];

    // csak ez jelenik meg ha kikommentelem az e.preventDefault()-ot! oldalfrissülés miatt?
    // ha nincs kikommentelve akkor egyiksem jelenik meg ************
    if (strlen($_POST["tippszo"]) !== 1) {
      $errors[] = "\t\t".'<article class="col p-2">Egy karaktert írjon be!</article>';
    }

    // különleges karakterek esete (a lista bővül) ************
    $kulonlegesKarekterek = ['\'', '"', '+', '-', '*', '/', '!', '%', '(', ')'];
    foreach ($kulonlegesKarekterek as $kar) {
      if ($_POST["tippszo"] === $kar) {
        $errors[] = "\t\t".'<article class="col p-2">Nem lehet különleges karakter!</article>';
      }
    }

    // ha ezt is tíltani akarjuk
    if (is_numeric($_POST["tippszo"])) {
      $errors[] = "\t\t".'<article class="col p-2">Nem lehet szám a megadott karakter!</article>';
    }

    if (count($errors) > 0) {
      foreach ($errors as $error) {
        print "$error";
      }
    }
  }
  print '</section>'."\n";
  print '</main>'."\n";

  ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/js/bootstrap.bundle.min.js" integrity="sha512-9GacT4119eY3AcosfWtHMsT5JyZudrexyEVzTBWV3viP/YfB9e2pEy3N7WXL3SV6ASXpTU0vzzSxsbfsuUH4sQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="main.js"></script>
</body>

</html>