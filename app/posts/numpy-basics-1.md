---
title: Podstawy pakietu Numpy - część 1
excerpt: Nazwa numpy pochodzi od "numeric python". Pakiet wykorzystywany jest powszechnie, do różnego rodzaju obliczeń matematycznych i operacjach na tablicach wielowymiarowych, również na macierzach. Pora więc przybliżyć sam pakiet, jak i jego najbardziej podstawowe możliwości w pierwszym wpisie opisującym tematy związane z data science.
date: April 1, 2020
tags: ["python", "datascience"]
cover_img: "numbers.jpg"
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. **Podstawy pakietu Numpy - część 1**
2. [Podstawy pakietu Numpy - część 2](https://amazed.dev/blog/numpy-basics-2)
3. [Podstawy pakietu Pandas - część 1](https://amazed.dev/blog/pandas-basics-1)
4. [Podstawy pakietu Pandas - część 2](hhttps://amazed.dev/blog/pandas-basics-2)
5. [Wizualizacja danych - podstawy pakietu Matplotlib](https://amazed.dev/blog/matplotlib-basics)
</div>

## Numpy jako wstęp do data science

Na blogu postanowiłem zacząć opisywać nowy większy temat związany ze wstępem do zagadnień _data science_. Pakiet _Numpy_, od _numeric python_, jest według mnie pierwszym etapem na drodze do zgłębienia tematyki analizy danych i tematów z nią związanych. Opiera się na nim bezpośrednio wiele pakietów, które będziemy tu w późniejszym czasie opisywać, np. _Pandas_, _Matplotlib_, czy _Scikit-Learn_.

Głównym obiektami, z które korzystamy w całym pakiecie, są wielowymiarowe, jednorodne tablice (_ndarrays_ od n-dimension array). Jednorodność oznacza, że wszystkie elementy tablicy muszą być tego samego typu. W zależności od wymiaru tabeli mówimy o jej osiach. Tablice jednowymiarowe, odzwierciedlające wektory, mają jedną oś. Tablice dwuwymiarowe mają 2 osie, jedną odpowiadającą wierszą, a drugą kolumną.

## Podstawy obiektu _ndarray_

Po zaimportowaniu pakietu do _jupyter notebook_'a możemy sprawdzić podstawowe właściwości obiektu _ndarray_. Na początek utworzymy dwie tablice, jedno i dwuwymiarową, odpowiednio _a_ i _b_. Pominę na razie opis tworzenia tablic, skupimy się na nim w następnym podrozdziale.

> Kod tego i kolejnych wpisów dotyczących _data science_ będzie przedstawiany jako fragmenty _jupyter notbook_-ów. Są to fragmenty notatnika wyeksportowanego do formatu html, stąd też czytelnik może kopiować poszczególne komórki i odpalać je u siebie w celu przećwiczenia omawianych tu zagadnień.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[1]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[2]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mf">1.3</span><span class="p">,</span> <span class="mf">2.</span><span class="p">,</span> <span class="mf">3.9</span><span class="p">,</span> <span class="mf">4.</span><span class="p">,</span> <span class="mf">5.1</span><span class="p">])</span>
<span class="n">a</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[2]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([1.3, 2. , 3.9, 4. , 5.1])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[3]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">5</span><span class="p">],</span> <span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="mi">6</span><span class="p">]])</span>
<span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[3]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1, 3, 5],
       [2, 4, 6]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Podstawowymi metodami służącymi do opisu tablicy są _ndarray.shape_ zwracający tuplę z ilością wierszy i kolumn tablicy oraz _ndarray.ndim_ która zwraca ilość wymiarów tablicy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[4]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">shape</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[4]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>(5,)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[5]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="o">.</span><span class="n">shape</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[5]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>(2, 3)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[6]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="o">.</span><span class="n">ndim</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[6]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>2</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Dodatkowo przydatna często okazuje się możliwość sprawdzenia sumarycznej ilości elementów w tablicy, czyli ilości wierszy pomnożonej przez ilość kolumn, służy do tego _ndarray.size_. Typ elementów w tablicy zwraca _ndarray.dtype_. Jest to jedna liczna, gdyż wszystkie elementy w tablicy muszą być tego samego typu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[7]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="o">.</span><span class="n">size</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[7]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>6</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[8]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">dtype</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[8]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>dtype(&#39;float64&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

> ### Typy danych NumPy
>
> Pakiet NumPy rozszerza zbiór typów danych znanych z pythona, wiele z nich zaczerpniętych jest z **C** i różnią się możliwą długością zapisanych w nich danych, oto przykłady:
>
> - np.int8 - Byte (-128 to 127)
> - np.int16 - Integer (-32768 to 32767)
> - np.int32 - Integer (-2147483648 to 2147483647)
> - np.uint8 - Unsigned integer (0 to 255)
> - ...
> - np.float32 - float
> - np.float64 - double float - ta sama precyzja co wbudowany float pythona
> - np.complex64 - float complex - liczba zespolona
>
> Najczęściej używanymi typami są int64 i float64.

## Tworzenie tablic

Tablice w _NumPy_ możemy tworzyć na wiele sposobów, podstawowym jest przekazanie do metody _np.array()_ obiektu, po którym można iterować. Mogą to być np. pythonowe listy czy tuple, przekazane bezpośrednio, lub jako zmienna na nie wskazująca.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[9]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">],</span> <span class="p">[</span><span class="mi">4</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">6</span><span class="p">],</span> <span class="p">[</span><span class="mi">7</span><span class="p">,</span> <span class="mi">8</span><span class="p">,</span> <span class="mi">9</span><span class="p">]])</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[9]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[10]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">8</span><span class="p">])</span>
<span class="n">a</span><span class="o">.</span><span class="n">dtype</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[10]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>dtype(&#39;int64&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[11]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mf">1.9</span><span class="p">,</span> <span class="mf">0.2</span><span class="p">,</span> <span class="mf">11.</span><span class="p">])</span>
<span class="n">b</span><span class="o">.</span><span class="n">dtype</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[11]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>dtype(&#39;float64&#39;)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Tablica przyjmie typ danych, które zostały przekazane w momencie jej tworzenia. Jeśli wartości będą liczbami całkowitymi, typem danych po utworzeniu tablicy będzie _int64_, a dla liczb zmiennoprzecinkowych _float64_. Warto pamiętać, że podstawowym typem dla _ndarray_ jest właśnie _float64_, stąd też, jeśli wartości przekazane przy tworzeniu tablicy będą mieszane (_float_ i _int_), wynikowa tablica będzie miała _dtype='float64'_, a wszystkie wartości całkowite zostaną przekonwertowane.

W momencie tworzenia tablicy możemy również zdefiniować jakiego typu dane mają się w niej znaleźć, za pomocą parametru _dtype_. NumPy postara się przekonwertować wszystkie wartości do zadanego typu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[12]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">c</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">],</span> <span class="n">dtype</span><span class="o">=</span><span class="s1">&#39;float32&#39;</span><span class="p">)</span>
<span class="n">c</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[12]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([1., 2., 3.], dtype=float32)</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Pakiet _NumPy_ udostępnia nam również wiele metod automatycznego tworzenia tablic według konkretnych szablonów. Przykładowe to _np.zeros()_ tworząca tablicę o zadanym rozmiarze, wypełnioną samymi zerami (jest analogiczna metoda _p.ones()_ z jedynkami), czy _p.eye()_, zwracająca kwadratową tablicę, na której głównej przekątnej są jedynki, a reszta to zera.

Za pomocą metody _np.full((row, col), fill_value)_ stworzymy tablicę, o zadanym kształcie, której wszystkie pola będą równe zadanej w parametrze _fill_value_ wartości.

Nieco bardziej skomplikowana jest ostatnia z pokazanych poniżej metod, czyli _np.empty()_. Jako parametry przyjmuje ona podobnie jak wyżej wymiary wynikowej tablicy. Różni się ona od _np.fill()_ tym, że wypełnia tablicę przypadkowymi wartościami zależnymi od stanu pamięci w momencie jej wywołania.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[13]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">3</span><span class="p">))</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[13]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0., 0., 0.],
       [0., 0., 0.],
       [0., 0., 0.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[14]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">eye</span><span class="p">(</span><span class="mi">2</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[14]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1., 0.],
       [0., 1.]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[15]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">full</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="mi">2</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[15]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[2, 2, 2, 2],
       [2, 2, 2, 2],
       [2, 2, 2, 2]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
  <div class="prompt input_prompt">In&nbsp;[16]:</div>
  <div class="inner_cell">
    <div class="input_area">
      <div class=" highlight hl-ipython3">
        <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">empty</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span></pre>
      </div>
    </div>
  </div>
</div>
<div class="output_wrapper">
  <div class="output">
    <div class="output_area">
      <div class="prompt output_prompt">Out[16]:</div>
      <div class="output_text output_subarea output_execute_result">
        <pre>array([[0.34906585, 0.6981317 , 1.04719755],
       [1.3962634 , 1.74532925, 2.0943951 ],
       [2.44346095, 2.7925268 , 3.14159265]])</pre>
      </div>
    </div>
  </div>
</div>
</div>

Często będziemy potrzebowali wytworzyć tablicę (zazwyczaj jednowymiarową - wektor), posiadającą dokładnie określoną ilość elementów z jakiegoś konkretnego przedziału. Przychodzą nam wtedy z pomocą dwie metody: _np.arange()_ i _np.linspace()_. Pierwsza działa podobnie jak pythonowe _range()_ przyjmując _start_, _stop_ i _step_, i zwracając jednowymiarową tablicę liczb zdefiniowanych tymi parametrami.

Nieznacznie inaczej działa _np.linspace()_, w której spośród trzech parametrach definiujemy również _start_ i _stop_, ostatni parametr jednak określa na ile równo oddalonych od siebie wartości wydzielić z przedziału _[start, stop]_. Bardzo przydatna metoda przy generowaniu zbioru wartości potrzebnego do zbudowania wykresu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[17]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[17]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3, 4])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[18]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[18]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([1, 3, 5, 7, 9])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[19]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">np</span><span class="o">.</span><span class="n">pi</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[19]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0.        , 0.34906585, 0.6981317 , 1.04719755, 1.3962634 ,
       1.74532925, 2.0943951 , 2.44346095, 2.7925268 , 3.14159265])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Na koniec pozostało tworzenie tablic wypełnionych randomowymi wartościami. Pakiet _NumPy_ posiada wiele metod spełniających to zadanie, chciałbym się tu jednak skupić na dwóch, różniących się od siebie zwracanym zakresem, z jakiego wybierana jest randomowa wartość.

Metoda _np.random.rand()_ zwraca tablicę o zadanym kształcie wypełnioną przypadkowymi wartościami z przedziału [0, 1). Natomiast metoda _np.random.randint()_ poza wymiarami tablicy przyjmuje ponadto zakres, z jakiego mają zostać wygenerowane losowe wartości całkowite. Górna wartość nie wchodzi do zakresu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[20]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">2</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[20]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0.24998296, 0.82311212],
       [0.45842003, 0.81463788],
       [0.46138329, 0.67196011]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[21]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">2</span><span class="p">))</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[21]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[4, 3],
       [2, 3],
       [2, 3]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[22]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">()</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[22]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0.7862749611786373</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[23]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class=" highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[23]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>5</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Obie powyższe metody mogą również służyć do generowania pojedynczych wartości, jeśli tylko pominiemy w parametrach wymiary wynikowej tablicy.

## Zmiana wymiarów tablicy

Kolejną ważną funkcjonalności _NumPy_ jest możliwość zmiany kształtu tablic. Jak już wiemy parametr _ndarray.shape_ pozwala nam sprawdzić długość osi tablicy, czyli dla tablicy 2D ilość jej kolumn i wierszy. Za pomocą metody _ndarray.reshape()_ możemy wygenerować nową tablicę na podstawie innej tablicy, zadając jej konkretne wymiary. Trzeba jednak pamiętać, że _rows_ \* _columns_ muszą dawać sumaryczną ilość elementów w tablicy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[24]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
<span class="n">a</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[24]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([1, 2, 3, 4, 5, 6, 7, 8, 9])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[25]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">a</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">3</span><span class="p">)</span>
<span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[25]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Metodą bardzo podobną do _ndarray.reshape()_ jest metoda _ndarray.resize()_, przyjmuje ona również ilość wierszy i kolumn oczekiwanej tablicy. Różnica polega na tym, że _.reshape()_ zwraca nową tablicę, którą trzeba zapisać do zmiennej w celu zachowania, _.resize()_ natomiast zmienia wymiary tablicy, na której zostało wykonane.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[26]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">resize</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span><span class="mi">3</span><span class="p">)</span>
<span class="n">a</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[26]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Często będziemy korzystali z _NumPy_ do wykonywania operacji związanych z macierzami, bardzo przydatna wtedy okaże się transpozycja macierzy (naszej tablicy), czyli odwrócenie jej przez główną oś. W numpy wykonujemy ją za pomocą metody _ndarray.T_.

Prostą i przydatną metodą jest również _ndarray.ravel()_, która spłaszcza tablicę do jednowymiarowej.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[27]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">T</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[27]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[1, 4, 7],
       [2, 5, 8],
       [3, 6, 9]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[28]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">.</span><span class="n">ravel</span><span class="p">()</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[28]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([1, 2, 3, 4, 5, 6, 7, 8, 9])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Często, przy dużych tablicach, zwłaszcza tych z większą niż dwa liczbą wymiarów, nie jesteśmy w stanie prosto i szybko określić jakie wartości powinniśmy zadać do _.reshape()_ aby idealnie pokryły ilość elementów tablicy. Wiemy np., że potrzebujemy 3 wiersze. Możemy wtedy zadać metodzie _.reshape()_ wartość _-1_, w miejsce wymiaru, którego nie znamy, a metoda sama dopasuje pasującą wartość.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[29]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">12</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[29]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[0.        , 0.27272727, 0.54545455, 0.81818182],
       [1.09090909, 1.36363636, 1.63636364, 1.90909091],
       [2.18181818, 2.45454545, 2.72727273, 3.        ]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Podstawowe operacje

Cechą tablic _NumPy_, która definitywnie pokazuje ich wyższość nad zwykłymi tablicami z pythona, jest sposób, w jaki przeprowadzane są na nich operacje matematyczne. Mianowice operacje przeprowadzana są kolejno na wszystkich elementach.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[30]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>
<span class="n">a</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[30]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3, 4])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[31]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mf">3.2</span><span class="p">,</span> <span class="mf">4.</span><span class="p">,</span> <span class="mf">0.8</span><span class="p">,</span> <span class="mf">1.</span><span class="p">,</span> <span class="mf">3.1</span><span class="p">])</span>
<span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[31]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([3.2, 4. , 0.8, 1. , 3.1])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[32]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">+</span> <span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[32]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([3.2, 5. , 2.8, 4. , 7.1])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Opisując to na przykładzie dodawanie dwóch tablic, każdy element wynikowej tablicy jest sumą elementów obu tablic na tej samej pozycji. Warunkiem takiego zachowania, są te same wymiary obu tablic. Odstępstwa od tej zasady zostaną omówione, gdy będę opisywał _"Broadcasting"_.

Możemy również wykonywać operacje na tablicach, gdzie drugim składnikiem operacji jest skalar. Potęgowania tablicy spowoduje, że w wynikowej tablicy każdy z elementów będzie podniesiony do potęgi.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[33]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="o">**</span><span class="mi">2</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[33]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 0,  1,  4,  9, 16])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Natomiast wykonanie operacji logicznych, typu _większy niż_, _mniejszy niż_ itp., zwraca tablicę o tym samym kształcie, gdzie każdy z jej elementów odpowiada wynikowi logicznej operacji przeprowadzonej na elemencie wejściowej tablicy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[34]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">&gt;</span> <span class="mi">3</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[34]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ True,  True, False, False,  True])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Zasadniczą cechą powyższych operacji jest tworzenie nowej tablicy, którą, aby zachować trzeba zapisać do zmiennej. Da się jednak w prosty sposób zmienić to zachowanie, używając do tych prostych operacji zapisu _+=_, _\*=_ itp. znanych z pythona.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[35]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">+=</span> <span class="n">a</span>
<span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[35]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([3.2, 5. , 2.8, 4. , 7.1])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Pakiet _NumPy_ daje nam również możliwość wykonać w prosty sposób tak zwane operacje jednoargumentowe na całych tablicach. Mowa to o np. znalezieniu sumy wszystkich elementów - _ndarray.sum()_, wartości największej i najmniejszej - _ndarray.max(), ndarray.min()_ itp.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[36]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">c</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">12</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">)</span>
<span class="n">c</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[36]:</div>
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
      <div class="prompt input_prompt">In&nbsp;[37]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">c</span><span class="o">.</span><span class="n">sum</span><span class="p">()</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[37]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>66</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[38]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">c</span><span class="o">.</span><span class="n">min</span><span class="p">()</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[38]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[39]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">c</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[39]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 3,  7, 11])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>  
</div>

Każda z powyższych operacji zwraca pojedynczy wynik dla całej tablicy. Można to zachowanie zmienić, podając która oś ma zostać zredukowana. W powyższym wypadku zadając _axis=1_, mówimy metodzie _.max()_, aby zredukowała kolumny do jednej i przedstawiła w niej największe wartości dla wszystkich wierszy. Pamiętajmy, że w _NumPy_ oś 0 to oś wierszy, a 1 oś kolumn.

Warto również dodać, że gdy przeprowadzamy operacje na dwóch tablicach lub tablicy i wartości skalarnej i posiadają one różne typy danych, wynikowa tablica odziedziczy dokładniejszy typ danych. Czyli gdy np. pomnożymy tablicę z _dtype=int64_ przez pojedynczą wartość mającą _dtype=float64_, cała wynikowa tablica będzie zawierała liczby zmiennoprzecinkowe.

## Uniwersalne funkcje NumPy

Pakiet _NumPy_ udostępnia również użytkownikom zestaw przygotowanych funkcji, które przyjmują tablicę i zwracają wynik określonej operacji matematyczne, przeprowadzonej element po elemencie, jako tablicę o tych samych wymiarach. W skrócie nazywane są _unfunc_ od _Universal Functions_. Możemy dzięki nim przeprowadzić wiele przydatnych operacji jak liczenie potęg, pierwiastków czy wartości funkcji trygonometrycznych.

Większość z nich pozwala również na podanie jako argument wartości skalarnej, zwracają wtedy również wynik obliczeń jako wartość skalarną.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[40]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">exp</span><span class="p">(</span><span class="n">a</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[40]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 1.        ,  2.71828183,  7.3890561 , 20.08553692, 54.59815003])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[41]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">a</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[41]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0.        , 1.        , 1.41421356, 1.73205081, 2.        ])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[42]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">sin</span><span class="p">(</span><span class="n">a</span><span class="p">)</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[42]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([ 0.        ,  0.84147098,  0.90929743,  0.14112001, -0.7568025 ])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Lista wszystkich dostępnych funkcji z odnośnikami do ich specyfikacji dostępna jest [tutaj](https://docs.scipy.org/doc/numpy/reference/ufuncs.html.)

## Indexing & Slicing

Kolejnym niezmiernie ważnym elementem pracy z tablicami _NumPy_ jest możliwość wybierania pojedynczych elementów bądź podtabel na podstawie konkretnych indeksów. W przypadku jednowymiarowych tablic indeksowanie wygląda dokładnie tak jak w przypadku tabel pythona. Możemy wybierać pojedyncze elementy bądź całe fragmenty podając index początku i końca wycinka oddzielone dwukropkiem _my_array[1:3]_. Pamiętajmy, że końcowy index nie wchodzi do wycinka - _[start, stop)_. Podobnie jak w przypadku tablic możemy pominąć pierwszy element, gdy wycinek zaczyna się od _0_ (np. _my_array[:2]_) i analogicznie, gdy kończy się na ostatnim elemencie.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[43]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">10</span><span class="p">)</span>
<span class="n">a</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[43]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[44]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="p">[</span><span class="mi">3</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[44]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>3</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[45]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="p">[</span><span class="mi">5</span><span class="p">:</span><span class="mi">7</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[45]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([5, 6])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[46]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="p">[:</span><span class="mi">4</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[46]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([0, 1, 2, 3])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[47]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">a</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[47]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>9</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy mamy do czynienia z tablicami o większej niż jeden liczbie wymiarów, do indeksowania i tworzenia wycinków nie używamy znanej z pythona składni _array[x][y]_. W _NumPy_ indeksy dla poszczególnych osi zapisujemy w pojedynczym kwadratowym nawiasie, oddzielone od siebie przecinkiem.

Dla dwuwymiarowych tablic pierwsza wartość określa wiersza, a druga kolumny. Tutaj również wycinki określamy, oddzielając początek i koniec znakiem dwukropka.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[48]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span> <span class="p">[</span><span class="mi">11</span><span class="p">,</span> <span class="mi">12</span><span class="p">,</span> <span class="mi">13</span><span class="p">,</span> <span class="mi">14</span><span class="p">],</span> <span class="p">[</span><span class="mi">21</span><span class="p">,</span> <span class="mi">22</span><span class="p">,</span> <span class="mi">23</span><span class="p">,</span> <span class="mi">24</span><span class="p">]])</span>
<span class="n">b</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[48]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[ 1,  2,  3,  4],
       [11, 12, 13, 14],
       [21, 22, 23, 24]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[49]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[49]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>1</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[50]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="p">[</span><span class="mi">1</span><span class="p">:,</span> <span class="mi">1</span><span class="p">:</span><span class="mi">3</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[50]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([[12, 13],
       [22, 23]])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Jeśli natomiast podamy mniej indeksów, niż tablica ma wymiarów, brakujące indeksy zostaną uzupełnione znakiem **:**, czyli pobrane zostaną wszystkie elementy.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[51]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3">
            <pre><span></span><span class="n">b</span><span class="p">[</span><span class="mi">2</span><span class="p">]</span></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[51]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>array([21, 22, 23, 24])</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Nie wyczerpuje to oczywiście możliwości indeksowania i wycinania fragmentów tablic. Po bardziej szczegółowe informacje i więcej przykładów odsyłam do dokumentacji. Tematy związane z indeksowaniem zostaną również poruszone w kolejnej części wpisu o _NumPy_, gdzie zajmiemy się trochę bardziej skomplikowanymi zagadnieniami, jak np. _fancy indexing_ czy _broadcasting_.

## Podsumowanie

W tym wpisie skupiłem się na przedstawieniu bardzo ogólnego zarysu możliwości pakietu _NumPy_. Tematy tu omówione pozwolą zacząć z nim pracę, lecz zdecydowanie nie wyczerpują tematu. Skupiam się wyłącznie na najprostszych zagadnieniach oraz omawiam tylko nieliczne bardzo wielu możliwości pakietu. Z tego też względu powstanie kolejny wpis, będący kontynuacją i rozszerzeniem opisu podstaw _NumPy_.

<!-- [https://www.amazeddeveloper.pl/blog/numpy-basics-2/](https://www.amazeddeveloper.pl/blog/numpy-basics-2/) -->
