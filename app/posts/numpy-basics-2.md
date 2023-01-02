---
title: Podstawy pakietu Numpy - część 2
excerpt: Kolejny wpis na temat NumPy. Poruszone tu zostaną bardziej zaawansowane zagadnienia. Skupimy się nad różnicami pomiędzy ndarrays a listami znanymi z Pythona, skąd bierze się wydajność NumPy oraz jak wydajniej indeksowań i wycinać tablice.
date: April 5, 2020
tags: [python, datascience]
cover_img: numbers2.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Podstawy pakietu Numpy - część 1](https://amazed.dev/blog/numpy-basics-1)
2. **Podstawy pakietu Numpy - część 2**
3. [Podstawy pakietu Pandas - część 1](https://amazed.dev/blog/pandas-basics-1)
4. [Podstawy pakietu Pandas - część 2](hhttps://amazed.dev/blog/pandas-basics-2)
5. [Wizualizacja danych - podstawy pakietu Matplotlib](https://amazed.dev/blog/matplotlib-basics)
</div>

## Ciąg dalszy

W poprzednim wpisie na temat podstaw _NumPy_ omówiliśmy podstawy podstaw wykorzystania tego jakże przydatnego pakietu. Pora teraz, aby rozszerzyć nieco przedstawione tam zagadnienia oraz omówić pokrótce co właściwie sprawia, że _ndarrays_ mają tak dużą przewagę nad _python list_.

Pierwszą część wpisu znaleść można [tutaj]('https://www.amazeddeveloper.pl/blog/numpy-basics-1/').

## NumPy ndarray vs. wbudowane w Python listy

Jak już było wspomniane w poprzednim wpisie, _ndarrays_ mają nad listami bardzo wiele przewag. Zacznijmy jednak od wydajności. Operacje na _ndarrays_ są znacznie szybsze i mniej zasobożerne. Jest to spowodowane sposobem zapisu danych w pamięci. W przypadku list poszczególne elementy nie koniecznie muszą być zapisane w pamięci jeden po drugim. Tak naprawdę lista posiada zapisane referencje (wskaźniki do miejsc w pamięci, gdzie znajdują się realne dane). Przy każdym pobieraniu danych z listy _Python_ robi dwie rzeczy: pobiera wskaźnik, a następnie na jego podstawie pobiera z pamięci wartość.

W listach nie jest wymagane, aby elementy były, chociażby tego samego typu, skoro referencja może wskazywać na dowolne miejsce w pamięci, o dowolnym rozmiarze.

Sytuacja ma się inaczej w przypadku _ndarrays_. Tutaj w momencie tworzenia każdy element jest zapisywany w pamięci jeden po drugim. Wymóg tego samego typu danych w cały _array_'u zapewnia jednakową ilość pamięci potrzebną na zapisanie każdego elementu, przez co wszystkie bloki są jednakowe. Znając typ danych a _ndarray_ system od razu wie, gdzie kończy się jeden, a zaczyna kolejny element _array_. Dzięki tej kontynuacji elementów iterowanie po tablicy jest znacznie wydajniejsze, gdyż nie trzeba szukać w pamięci po wskaźnikach.

Duży wpływ na wyższość _ndarrays_ nad listami ma również możliwość przeprowadzania operacji element po elemencie. Mnożenie czy dodawanie dwóch _ndarray_ powoduje wykonanie operacji pomiędzy każdym odpowiadającym elementem tablicy. Niesie to za sobą wymóg zgodności wymiarów tablicy. Występują od niego jednak wyjątki, o których poniżej.

## Broadcasting

Broadcasting możemy opisać jako mechanizm wykonywania operacji arytmetycznych element po elemencie między dwoma tablicami, w przypadku, gdy tablice nie posiadają tych samych wymiarów. W bardzo dużym uproszczeniu można to opisać, jako rozciąganie mniejszej tablicy (kopiowanie kolumn czy wierszy), do momentu, aż wymiary obu tablic będą się zgadzać. Oczywiście _NumPy_ nie robi żadnego kopiowania, a cały mechanizm dzieje się dzięki iteracją w języku _C_ na zwektoryzowanych tablicach.

Aby rozciąganie było możliwe, poszczególne wymiary dwóch tablic muszą być kompatybilne. Kompatybilność zachowana jest tylko wtedy, gdy ten sam wymiar (dla dwuwymiarowej tablicy wiersze bądź kolumny) w dwóch tablicach jest albo równy, albo wynosi 1.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[52]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">4</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[52]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[53]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">**</span> <span class="mi">2</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[53]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 4, 9])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy wykonujemy operację arytmetyczną pomiędzy tablicą a wartością skalarną, powyższe reguły są zachowane. Skalar, mimo iż nie jest tablicą _ndarray_, jest rozumiany jako tablica o wymiarach _(1, 1)_, stąd też niezależnie od wymiarów drugiej tablicy, można go rozciągnąć do jej wymiarów i przeprowadzić operację element po elemencie.

Gdy jednak tablice nie są ze sobą kompatybilne, jak w poniższym przypadku, dostajemy _ValueError: operands could not be broadcast together with shapes (4,) (3,)_. Oznacza to, że _NumPy_ nie wył w stanie dostosować żadnego z wymiarów, aby pasował do drugiej tabeli.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[54]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
<span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[54]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0., 0., 0.])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[55]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="o"> + </span><span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt"></div>
          <div class="output_subarea output_text output_error">
            <pre>
  <span class="ansi-red-fg">---------------------------------------------------------------------------</span>
  <span class="ansi-red-fg">ValueError</span>                                Traceback (most recent call last)
  <span class="ansi-green-fg">&lt;ipython-input-55-ca730b97bf8a&gt;</span> in <span class="ansi-cyan-fg">&lt;module&gt;</span>
  <span class="ansi-green-fg">----&gt; 1</span><span class="ansi-red-fg"> </span>a<span class="ansi-blue-fg">+</span>b
  
  <span class="ansi-red-fg">ValueError</span>: operands could not be broadcast together with shapes (4,) (3,) </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Aby broadcasting się powiódł, musimy odwrócić jedną z tablic, tak aby miała jedną kolumnę i kilka wierszy. Na poniższym przykładzie tablica _a_ została odwrócona, teraz główny wymiar (liczba wierszy) _a_ wynosi 4, natomiast w _b_ wynosi 1, możemy więc _'rozciągnąć'_ tablicę _a_, aby miała 3 jednakowe kolumny. Podobnie _rozciągamy'_ tablicę _b_ aby miała 4 jednakowe wiersze. Teraz już można dodać do siebie tak zdefiniowane tablice.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[56]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">resize</span><span class="p">(</span><span class="mi">4</span><span class="p">,</span><span class="mi">1</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[56]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0],
       [1],
       [2],
       [3]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[57]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="o"> + </span><span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[57]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0., 0., 0.],
       [1., 1., 1.],
       [2., 2., 2.],
       [3., 3., 3.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

To tylko bardzo prosty przykład tego, jak działa broadcasting w _NumPy_, po więcej możliwości użycia kieruję do dokumentacji pakietu.

## Fancy indexing

Kolejnym bardziej zaawansowanym tematem przy pracy z pakietem _NumPy_ jest tak zwane _fancy indexing_, czyli indeksowanie przy pomocy tablic indeksów, bądź tablic wartości logicznych _True/False_.

#### Przy pomocy tablic indeksów

Najprostszym sposobem użycia _fancy indexing_ jest przekazanie w nawiasach kwadratowych, w miejscu wybieranego indeksu czy wycinka, całej listy indeksów. W ten sposób w nowopowstałej tablicy zostaną zawarte elementy starej, o indeksach odpowiadających wartością przekazanej tablicy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[58]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">8</span><span class="p">)</span><span class="o">*</span><span class="mi">2</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[58]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 0,  2,  4,  6,  8, 10, 12, 14])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[59]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">i1</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">0</span><span class="p">])</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[60]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">i1</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[60]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 4, 10,  0])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy przekazana jako wartość indeksu tablica będzie tablicą wielowymiarową, wynikowa tablica będzie dokładnie odzwierciedlać jej wymiary.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[61]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">i2</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">7</span><span class="p">],</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">3</span><span class="p">],</span> <span class="p">[</span><span class="mi">4</span><span class="p">,</span> <span class="mi">1</span><span class="p">]])</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[62]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">i2</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[62]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[ 0, 14],
       [ 2,  6],
       [ 8,  2]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Sprawa wygląda nieco trudniej, gdy chcemy w ten sposób indeksować tablicę dwuwymiarową. Musimy do tego celu stworzyć dwie tablice indeksujące, obie posiadające dokładnie wymiary oczekiwanej tablicy wynikowej. Pierwsza z nich odpowiada indeksom głównej osi (przy dwuwymiarowej tablicy - osi wierszy), a druga indeksom osi podrzędnej.

Przy indeksowanych tablicach o większej liczbie wymiarów, należy adekwatnie przekazać więcej tablic indeksujących. Odpowiednio jedna na każdy wymiar.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[63]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">9</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">3</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[63]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0, 1, 2],
       [3, 4, 5],
       [6, 7, 8]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[64]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">row</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">2</span><span class="p">],</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">]])</span>
<span class="n">row</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[64]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0, 2],
       [1, 1]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[65]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">col</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">],</span> <span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">0</span><span class="p">]])</span>
<span class="n">col</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[65]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0, 1],
       [2, 0]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[66]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">row</span><span class="p">,</span> <span class="n">col</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[66]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0, 7],
       [5, 3]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Poza tworzeniem niestandardowych wycinków z tablic metoda ta bardzo dobrze sprawdza się do nadpisywania wartości określonych elementów. Wystarczy, przekazując w nawiasach kwadratowych tablicę indeksów przypisać takiemu wyrażeniu jakąś określoną wartość, a otrzymają ją wszystkie wybrane elementy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[67]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">4</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[67]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[68]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">]]</span> <span class="o">=</span> <span class="mi">99</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[68]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 0, 99, 99,  3])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

#### Przy pomocy tablic wartości logicznych

Bardzo przydatną funkcjonalnością _NumPy_ jest możliwość indeksowania tablic za pomocą tablic wartości logicznych. Aby to jednak było możliwe, potrzebujemy tablicy, o tych samych wymiarach co tablica, którą chcemy indeksować oraz wypełnionej tylko wartościami logicznymi. Na szczęście z pomocą przychodzą nam tutaj _broadcasting_ i proste operacje na tablicach. Gdy wykonamy operację logiczną na całej tablicy (jak poniżej), operacja ta wykona się element po elemencie, a wynikiem będzie właśnie tablica wartości logicznych.

Przekazując tak powstałą tablicę jako indeks innej tablicy, spowodujemy wybranie z niej tylko elementów, dla których w tablicy indeksującej występowało _True_. Pamiętać trzeba, że nawet jeśli pierwotnie tablica miała więcej niż jeden wymiar, wynik zostanie zwrócony jako tablica jednowymiarowa.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[69]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">12</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[69]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[ 0,  1,  2,  3],
       [ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[70]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">a</span> <span class="o">%</span> <span class="mi">2</span> <span class="o">==</span> <span class="mi">0</span>
<span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[70]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[ True, False,  True, False],
       [ True, False,  True, False],
       [ True, False,  True, False]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[71]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">b</span><span class="p">]</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[71]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 0,  2,  4,  6,  8, 10])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

W bardzo prosty sposób można tak przypisać określoną, wspólną wartość pewnej grupie elementów, wybranych na podstawie operacji logicznej.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[72]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">b</span><span class="p">]</span> <span class="o">=</span> <span class="mi">99</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[72]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[99,  1, 99,  3],
       [99,  5, 99,  7],
       [99,  9, 99, 11]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Oczywiście powyższe operacje można wykonać, stosując znacznie prostszy zapis, gdzie bezpośrednio jako indeks tablicy wstawiamy operację logiczną wykonywaną na tej samej tablicy. Bardzo często przy pracy na _NumPy_, będziemy widzieć ten rodzaj operacji zapisany właśnie w ten sposób.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[73]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">[</span><span class="n">a</span> <span class="o">&lt;</span> <span class="mi">10</span><span class="p">]</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[73]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[99,  0, 99,  0],
       [99,  0, 99,  0],
       [99,  0, 99, 11]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Zrozumieć co jest kopią a co referencją

Często w _NumPy_ na początku pracy natrafiamy na problem z wycinkami. Gdy przypisujemy do zmiennej inną zmienną, która zawiera tablicę _ndarray_, _NumPy_ nie tworzy kopi tej tablicy, a obie zmienne wskazują dokładnie na tę samą tablicę, czyli na ten sam obiekt w pamięci. Może to prowadzić do nieoczekiwanych zachowań podczas edycji tablic, zwłaszcza przypisywań wartości.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[74]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">9</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">3</span><span class="p">)</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[74]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0, 1, 2],
       [3, 4, 5],
       [6, 7, 8]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[75]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[76]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">=</span> <span class="mi">100</span>
<span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[76]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[  0,   1,   2],
       [  3,   4,   5],
       [  6,   7, 100]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[77]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[77]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[  0,   1,   2],
       [  3,   4,   5],
       [  6,   7, 100]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Dokładnie to widać, gdy sprawdzimy dwie zmienne operatorami _is_. Porównanie pokazuje, że są one, a dokładniej wskazują na to samo.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[78]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span> <span class="ow">is</span> <span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[78]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>True</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Podobne zachowanie występuje również, gdybyśmy do zmiennej _b_ przypisali tylko wycinek tablicy _a_. Również wtedy zmiany w _b_ spowodowałyby bezpośrednie zmiany w tablicy _a_.

Aby zapobiec takiemu zachowaniu, dobrą praktyką jest tworzenie kopi tablicy za pomocą metody _ndarray.copy()_. Tworzy ona tak zwaną _głęboką kopię_, co oznacza, że tworzony jest nowy obiekt w pamięci, więc referencja obu zmiennych nie wskazuje już na to samo miejsce. Możemy dzięki temu spokojnie wprowadzać zmiany, nie martwiąc się, że zmienimy coś w pierwotnej tablicy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[79]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">c</span> <span class="o">=</span> <span class="n">a</span><span class="o">.</span><span class="n">copy</span><span class="p">()</span></pre></div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[80]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">c</span> <span class="ow">is</span> <span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[80]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>False</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[81]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">c</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="mi">999</span>
<span class="n">c</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[81]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[999,   1,   2],
       [  3,   4,   5],
       [  6,   7, 100]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[82]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[82]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[  0,   1,   2],
       [  3,   4,   5],
       [  6,   7, 100]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Łączenie tablic

Ostatnia część tego wpisu nie jest może zbyt trudna, ale aby ograniczyć długość części pierwszej, znalazł się tutaj. Mowa o składaniu tablic. W _NumPy_ występują dwie podstawowe metody pozwalające na połączenie ze sobą dwóch lub więcej tablic, a mianowicie _.hstack()_ - od horizontal stacking oraz _.vstack()_ od vertical stacking. Obie przyjmuję jako argumenty tuplę z tablicami do złożenia. Tablice zostaną ze sobą złączone w kolejności przekazanej w tupli.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[83]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">ones</span><span class="p">((</span><span class="mi">2</span><span class="p">,</span><span class="mi">2</span><span class="p">))</span>
<span class="n">a</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[83]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1., 1.],
       [1., 1.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[84]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">))</span>
<span class="n">b</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[84]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0., 0.],
       [0., 0.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[85]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">vstack</span><span class="p">((</span><span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">))</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[85]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1., 1.],
       [1., 1.],
       [0., 0.],
       [0., 0.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[86]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">hstack</span><span class="p">((</span><span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">))</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[86]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1., 1., 0., 0.],
       [1., 1., 0., 0.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Podsumowanie

Na tym koniec wpisów na temat podstaw pakietu _NumPy_. Pora przejść do bardziej zaawansowanych i częściej używanych bibliotek związanych z przetwarzaniem i wizualizacją danych jak _Pandas_ czy _Matplotlib_. Jednak informacje zdobyte w tych dwóch wpisach zdecydowanie się nam przydadzą, gdyż niemal każde z w przyszłości omawianych narzędzi jest oparte lub korzysta z \*NumPy.
