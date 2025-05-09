---
title: Podstawy pakietu Pandas - część 2
excerpt: Pandas daje użytkownikowi niemal nieograniczone możliwości przetwarzania i analizy danych. W tym wpisie postaramy się przybliżyć w prosty sposób możliwości pakietu, między innymi pobieranie na różne sposoby fragmentów tabel, łączenie datasetów, grupowanie powiązanych danych czy obliczanie statystyk i przekształceń danych.
date: April 13, 2020
tags: [python, datascience]
cover_img: pandas2.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Podstawy pakietu Numpy - część 1](https://amazed.dev/blog/numpy-basics-1)
2. [Podstawy pakietu Numpy - część 2](https://amazed.dev/blog/numpy-basics-2)
3. [Podstawy pakietu Pandas - część 1](https://amazed.dev/blog/pandas-basics-1)
4. **Podstawy pakietu Pandas - część 2**
5. [Wizualizacja danych - podstawy pakietu Matplotlib](https://amazed.dev/blog/matplotlib-basics)
</div>

## Praca z danymi w Pandas

W poprzednim wpisie poznaliśmy różne sposoby tworzenia _DataFrames_. Możemy teraz zająć się pracą z tymi strukturami. Dlatego też w tym wpisie poruszymy między innymi tematy indeksowania i wycinania fragmentów, podstawowych operacje na całych tablicach, łączenia tablic, czy grupowania elementów. Wprowadzenie to pozwoli nam na rozpoczęcie prawdziwej pracy z pakietem _Pandas_.

## Pobieranie wartości - selecting

Pakiet _Pandas_ daje nam kilka różnych możliwości pobierania konkretnych danych z _DataFrame_. Można je zawęzić do czterech szczególnych grup:

- proste pobierania;
- pobieranie na podstawie indeksu;
- pobieranie na podstawie etykiety;
- pobieranie na podstawie wartości logicznych.

### Proste pobieranie kolumny / wierszy - getting

Najprostszym sposobem na pobranie kolumny z _DataFrame_ jest przekazanie jej nazwy w nawiasach kwadratowych, w ten sam sposób jak przy pobieraniu wartości ze słownika na podstawie klucza. Takie wywołanie zwraca kolumnę jako serię `pd.Series`.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[40]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">(</span><span class="mi">7</span><span class="p">,</span><span class="mi">4</span><span class="p">),</span> <span class="n">columns</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;ABCD&#39;</span><span class="p">),</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;abcdefg&#39;</span><span class="p">))</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[40]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>0.446016</td>
                    <td>0.924192</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;B&#39;</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> 
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[41]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>a    0.864173
b    0.634011
c    0.364428
d    0.824623
e    0.673784
f    0.721057
g    0.196557
Name: B, dtype: float64</pre>
          </div> </div> </div>
    </div>
  </div>
</div>

Możemy również w ten sposób pobrać wycinek z _DataFrame_, przekazując w nawiasach kwadratowych indeksy wierszy, które chcemy wyciąć, na tych samych zasadach, jak wycinając fragmenty listy.

Aby jednak pobrać bardziej specyficzne fragmenty, bądź pojedyncze wartości, musimy posłużyć się wbudowanymi w _Pandas_ metodami.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[42]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="mi">3</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[42]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div>
  </div>
</div>

### Pobieranie na podstawie etykiet

W _Pandas_, gdy zdefiniujemy nazwy kolumn, oraz etykiety odzwierciedlające wiersze tabeli _DataFrame_ (również _Series_), możemy korzystać z pobierania wycinków właśnie na podstawie tych etykiet i nazw kolumn.

Podstawowa metoda do tego służąca to `.loc[]`. Należy zwrócić uwagę, że wartości do metody przekazujemy w nawiasach kwadratowych _[ ]_. Metoda ta działa niemal identycznie jak pobieranie wycinków w _ndarray_ pakietu _NumPy_, z tą różnicą, że zamiast indeksów kolumn i wierszy przekazujemy odpowiadające im etykiety (w przypadku kolumn są to po prostu ich nazwy). Gdy pobieramy zakres _od - do_, obie wartości wchodzą w skład wycinka - _[start, stop]_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[43]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="s1">&#39;b&#39;</span><span class="p">:</span><span class="s1">&#39;d&#39;</span><span class="p">,</span> <span class="p">:]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[43]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Możemy również przekazywać listę etykiet, które mają zostać zwrócone. Działa to zarówno dla kolumn, jak i wierszy. Mogą one być w innej kolejności niż w początkowym _DataFrame_.

Gdy w którymś z wymiarów przekażemy tylko jedną wartość, niezależnie czy są to wiersze, czy kolumny, wynikowy wycinek zostanie zwrócony jako jednowymiarowa seria z indeksami w postaci etykiet. Należy zauważyć, że każdy taki wycinek ma wtedy atrybut _name_, który odpowiada etykiecie z osi, na której wybieraliśmy pojedynczą wartość.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[44]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;B&#39;</span><span class="p">,</span> <span class="s1">&#39;D&#39;</span><span class="p">]]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[44]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>B    0.364428
D    0.804634
Name: c, dtype: float64</pre>
          </div> </div> </div>
    </div></div>
</div>

Przy pomocy etykiet możemy również pobrać pojedyncze wartości skalarne z tabeli, określając ich dokładne położenie w obu osiach.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[45]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;D&#39;</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[45]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0.3769706017945337</pre>
          </div> </div> </div>
    </div></div>
</div>

W przypadku pobieranie pojedynczej wartości skalarnej możemy również skorzystać z metody `.at[]`. Jej zachowanie i wynik są dokładnie takie same jak `.loc[]`, ale działa ona tylko w przypadku skalarów. Jest ona za to lepiej zoptymalizowana do tego celu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[46]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">at</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;D&#39;</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[46]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0.3769706017945337</pre>
          </div> </div> </div>
    </div></div>
</div>

### Pobieranie na podstawie indeksów

Kolejna niezwykle przydatna metoda służąca pobieraniu fragmentów _DataFrame_ to `.iloc[]`, różniąca się od wyżej omawianego `.loc[]` tylko tym, że przyjmuje indeksy wierszy i kolumn, zamiast etykiet. Pamiętać należy, że aby wybrać kolumny, również należy podać ich numery porządkowe, czyli jakby indeksy z _ndarray_. Metoda ta właściwie działa jak indeksowanie po _ndarray_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[47]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">1</span><span class="p">:</span><span class="mi">4</span><span class="p">,</span> <span class="mi">1</span><span class="p">:</span><span class="mi">3</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[47]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>b</th>
                    <td>0.634011</td>
                    <td>0.251610</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.364428</td>
                    <td>0.040306</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.824623</td>
                    <td>0.731735</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[48]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">2</span><span class="p">:,</span> <span class="p">:]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[48]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>0.446016</td>
                    <td>0.924192</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Z racji na podobieństwa do pracy z _ndarray_ nie ma za wiele co tłumaczyć dodatkowo o `.iloc[]`. Pamiętajmy tylko, że w przeciwieństwie do `.loc[]`, w przypadku wycinaniu zakresu używając znaku _:_, koniec zakresu nie wchodzi do wybieranego zbioru - _[start, stop)_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[49]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">4</span><span class="p">],</span> <span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">0</span><span class="p">]]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[49]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>C</th>
                    <th>A</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.986293</td>
                    <td>0.808135</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.040306</td>
                    <td>0.115817</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.446016</td>
                    <td>0.661840</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Gdy w metodzie `.iloc[]` przekażemy tylko jedną wartość, zwrócona zostanie `pd.Series` zawierająca wiersz o podanym indeksie. Gdy natomiast przekażemy tylko jeden zakres _od : do_, _Pandas_ potraktuje to jako wartości indeksów wycinka w osi wierszy i automatycznie przekaże wszystkie kolumny.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[50]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">2</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[50]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>A    0.115817
B    0.364428
C    0.040306
D    0.804634
Name: c, dtype: float64</pre>
          </div> </div> </div>
    </div></div>
</div>

W wypadku pobierania pojedynczej wartość metoda `.iloc[]` działa tak samo, jak odpowiedniczka działająca na etykietach. Tutaj też mamy do czynienia, z dodatkową metodą, `.iat[]` do pobierania skalarów, która jest znacznie bardziej zoptymalizowana.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[51]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[51]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0.804633928699436</pre>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[52]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">iat</span><span class="p">[</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[52]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0.804633928699436</pre>
          </div> </div> </div>
    </div></div>
</div>

### Pobieranie na podstawie wartości logicznych

Kolejnym sposobem na wybieranie elementów _DataFrame_ jest przekazanie w nawiasach kwadratowych wartości logicznej wyliczanej na całym _df_ lub jego fragmencie.

Gdy operacja logiczna zostanie przeprowadzona na całym _DataFrame_, wynikiem operacji będzie _DataFrame_ o tych samych wymiarach, który ma wartości w miejscach, gdzie wartość logiczna była prawną, oraz _np.NaN_ tam, gdzie była fałszem.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[53]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="n">df</span> <span class="o">&gt;</span> <span class="mf">0.5</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[53]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>NaN</td>
                    <td>0.634011</td>
                    <td>NaN</td>
                    <td>0.887188</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>NaN</td>
                    <td>NaN</td>
                    <td>NaN</td>
                    <td>0.804634</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>NaN</td>
                    <td>0.924192</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>NaN</td>
                    <td>0.825636</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>NaN</td>
                    <td>NaN</td>
                    <td>NaN</td>
                    <td>0.543766</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Jeśli natomiast operację logiczną wykonamy dla pojedynczej kolumny i tak zbudowana maskę przekażemy do _DataFrame_, wynikiem będą wyłącznie te kolumny, dla których maska zwróciła _True_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[54]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;A&#39;</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mf">0.5</span><span class="p">]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[54]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>0.446016</td>
                    <td>0.924192</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Gdy mówimy o pobieraniu fragmentu na podstawie wartości logicznych, bardzo przydatną metodą okazuje się `.isin()`. Metoda ta działa bardzo podobnie jak do sprawdzania, czy klucz występuje w słowniku. Potrzebujemy do tego kolumny, która zawiera ograniczoną ilość różniących się od siebie elementów.

Metodę tą wykonujemy na wybranej kolumnie, przekazując jej wartości, których występowanie chcemy sprawdzić w _DataFrame_. Jako wynik dostajemy wyłącznie wiersze, które w sprawdzanej kolumnie zawierają sprawdzane wartości.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[55]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;E&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span> <span class="s1">&#39;biz&#39;</span><span class="p">,</span> <span class="s1">&#39;fis&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span> <span class="s1">&#39;biz&#39;</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">]</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[55]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                    <td>foo</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                    <td>bar</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                    <td>biz</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                    <td>fis</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>0.446016</td>
                    <td>0.924192</td>
                    <td>bar</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                    <td>biz</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                    <td>foo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[56]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;E&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">isin</span><span class="p">([</span><span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;fis&#39;</span><span class="p">])]</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[56]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                    <td>foo</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                    <td>fis</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                    <td>foo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

### Przypisywanie wartości

Wszystkie omawiane powyżej metody pobierania wartości z _DataFrame_ mogą służyć również do przypisywania wartości większym fragmentom danych.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[57]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">7</span><span class="p">),</span> <span class="n">index</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;abcdefg&#39;</span><span class="p">))</span> </pre></div> </div>
      </div>
    </div> 
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[58]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;F&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">s</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[58]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                    <td>foo</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                    <td>bar</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.364428</td>
                    <td>0.040306</td>
                    <td>0.804634</td>
                    <td>biz</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.824623</td>
                    <td>0.731735</td>
                    <td>0.014764</td>
                    <td>fis</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.673784</td>
                    <td>0.446016</td>
                    <td>0.924192</td>
                    <td>bar</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                    <td>biz</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                    <td>foo</td>
                    <td>6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[59]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="s1">&#39;c&#39;</span><span class="p">:</span><span class="s1">&#39;e&#39;</span><span class="p">,</span> <span class="p">[</span><span class="s1">&#39;B&#39;</span><span class="p">,</span> <span class="s1">&#39;C&#39;</span><span class="p">]]</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[59]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                    <td>foo</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                    <td>bar</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.000000</td>
                    <td>0.000000</td>
                    <td>0.804634</td>
                    <td>biz</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.000000</td>
                    <td>0.000000</td>
                    <td>0.014764</td>
                    <td>fis</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>0.661840</td>
                    <td>0.000000</td>
                    <td>0.000000</td>
                    <td>0.924192</td>
                    <td>bar</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>0.966234</td>
                    <td>0.721057</td>
                    <td>0.297543</td>
                    <td>0.825636</td>
                    <td>biz</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>0.459524</td>
                    <td>0.196557</td>
                    <td>0.001539</td>
                    <td>0.543766</td>
                    <td>foo</td>
                    <td>6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Zdecydowanie najczęściej wykorzystywanym w przypisywaniu sposobem wybierania obszaru do nadpisania jest wybieranie go przy pomocy wartości logicznych, czyli maskowania. Każda komórka, dla której maska zwróciła _True_ zostanie nadpisana przypisaną wartością.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[60]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;F&#39;</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mi">3</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[60]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>a</th>
                    <td>0.808135</td>
                    <td>0.864173</td>
                    <td>0.986293</td>
                    <td>0.376971</td>
                    <td>foo</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>b</th>
                    <td>0.249514</td>
                    <td>0.634011</td>
                    <td>0.251610</td>
                    <td>0.887188</td>
                    <td>bar</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>c</th>
                    <td>0.115817</td>
                    <td>0.000000</td>
                    <td>0.000000</td>
                    <td>0.804634</td>
                    <td>biz</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <th>d</th>
                    <td>0.685172</td>
                    <td>0.000000</td>
                    <td>0.000000</td>
                    <td>0.014764</td>
                    <td>fis</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>e</th>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>f</th>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>g</th>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1.000000</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

## Operacje

Operacje matematyczne przeprowadzane na _DataFrame_ odbywają się w podobny sposób jak na _ndarray_ z pakietu _NumPy_. Mianowicie przeprowadzane są na całej tabeli, a dokładniej na wszystkich numerycznych kolumnach tej tabeli. Zostaną również zastosowane wszystkie reguły związane z _broadcastingiem_ znanym z _NumPy_.

### Statystyka

Większość regularnie używanych metod dających informacje o _DataFrame_ wylicza znane ze statystyki wartości, np. średnia, mediana, odchylenie standardowe, czy po prostu oblicza skumulowane wartości dla tabeli jak suma.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[61]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">4</span><span class="p">),</span> <span class="n">columns</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;ABCD&#39;</span><span class="p">))</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[61]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.690684</td>
                    <td>0.324174</td>
                    <td>-0.335372</td>
                    <td>1.313379</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>-0.467937</td>
                    <td>0.162174</td>
                    <td>-0.616831</td>
                    <td>1.829192</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.235984</td>
                    <td>0.278024</td>
                    <td>1.417945</td>
                    <td>0.129966</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-1.254355</td>
                    <td>0.905757</td>
                    <td>-0.195888</td>
                    <td>-0.131335</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>0.532403</td>
                    <td>-0.054235</td>
                    <td>0.277141</td>
                    <td>-0.787686</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div>
  </div>
</div>

Metody te głównie zwracają skumulowane wartości wyliczane kolumna po kolumnie. Aby nadpisać to zachowanie i wymusić na metodzie, aby zwróciła wartość wiersz po wierszu, jako parametr należy przekazać _axis=1_ (lub po prostu _1_ ), co wyznaczy kierunek liczenia wartości.

Wszystkie te metody automatycznie próbują wykorzystać tylko wartości numeryczne i pomijają wartości _NaN_. Gdy kolumna zawiera same wartości tekstowe, zostanie ona pominięta w wynikowej `pd.Series`.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[62]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">mean</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[62]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>A   -0.147038
B    0.323179
C    0.109399
D    0.470703
dtype: float64</pre>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[63]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[63]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0    0.498216
1    0.226649
2    0.397488
3   -0.168955
4   -0.008094
dtype: float64</pre>
          </div> </div> </div>
    </div></div>
</div>

Metody typu `.cumsum()` nie zmniejszają wymiaru wynikowej struktury. Zwracają wynik o tym samym kształcie. Również w tym przypadku zdefiniowanie _axis_ pozwoli wybrać, w którym kierunku (po wierszach, czy kolumnach) mają zostać wyliczone skumulowane sumy tabeli.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[64]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">cumsum</span><span class="p">()</span>
  </pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[64]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.690684</td>
                    <td>0.324174</td>
                    <td>-0.335372</td>
                    <td>1.313379</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>0.222746</td>
                    <td>0.486348</td>
                    <td>-0.952202</td>
                    <td>3.142571</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.013238</td>
                    <td>0.764372</td>
                    <td>0.465742</td>
                    <td>3.272537</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-1.267592</td>
                    <td>1.670129</td>
                    <td>0.269854</td>
                    <td>3.141202</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>-0.735189</td>
                    <td>1.615894</td>
                    <td>0.546995</td>
                    <td>2.353516</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Na tablicach _DataFrame_ można z powodzeniem również wykonywać metody z pakietu _NumPy_. Wystarczy jako argument przekazać cały _DataFrame_ lub jego fragment. Gdy do metody `np.sum()` przekażemy kolumnę, zwróci ona zsumowane wszystkie wartości tej kolumny. Gdy za to przekażemy wielokolumnowy _DataFrame_ otrzymamy sumy policzone dla każdej z kolumn osobno. Również tutaj argument _axis_ pozwoli zmienić to, po której osi zostanie suma wyliczona.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[65]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">(</span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;A&#39;</span><span class="p">])</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[65]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>-0.7351892998655505</pre>
          </div> </div> </div>
    </div></div>
</div>

Dwoma bardzo przydatnymi metodami, które dadzą nam sporo informacji o _DataFrame_ są `.idxmax()` i `.idxmin`. Zwracają one indeksy największej i najmniejszej wartości w kolumnie. Argument _axis=1_ spowoduje, że zwrócone zostaną odpowiadające wartości dla wierszy.

Obie metody zadziałają również, gdy zostaną wykonane na serii, zwrócą wtedy pojedyncza wartość indeksu odpowiadającego odpowiednio największej i najmniejszej wartości w serii.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[66]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">idxmax</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[66]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>A    0
B    3
C    2
D    1
dtype: int64</pre>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[67]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">idxmin</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[67]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0    C
1    C
2    A
3    A
4    D
dtype: object</pre>
          </div> </div> </div>
    </div></div>
</div>

Kolejną bardzo przydatną metodą, którą możemy wykonać na serii, jest metoda `.values_count()`. Zwraca ona, jak często poszczególna wartość wystąpiła w podanej serii. Świetnie nadaje się ona do budowania prostych histogramów.

Metoda ta z automatu pomija wartości _np.NaN_, możemy to zachowanie zmienić, przekazując do metody parametr _dropna=False_. W tym wypadku, jeśli w serii występują brakujące wartości, zostaną one również policzone i zwrócone w zestawieniu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[68]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">Series</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">6</span><span class="p">,</span> <span class="n">size</span><span class="o">=</span><span class="mi">7</span><span class="p">))</span>
<span class="n">s</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[68]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0    3
1    1
2    4
3    3
4    2
5    1
6    4
dtype: int64</pre>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[69]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="o">.</span><span class="n">value_counts</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[69]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>4    2
3    2
1    2
2    1
dtype: int64</pre>
          </div> </div> </div>
    </div></div>
</div>

### Informacje o zbiorze danych

Chyba najważniejszą i najprostszą w użyciu metodą, która daje nam bardzo szybkie i dokładne informacje o tym, co znajduje się w tabeli _DataFrame_ jest metoda `.describe()`. Zwraca ona zestaw statystyk opisowych wyliczonych kolumna po kolumnie dla całej tabeli.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[70]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">describe</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[70]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>count</th>
                    <td>5.000000</td>
                    <td>5.000000</td>
                    <td>5.000000</td>
                    <td>5.000000</td>
                  </tr>
                  <tr>
                    <th>mean</th>
                    <td>-0.147038</td>
                    <td>0.323179</td>
                    <td>0.109399</td>
                    <td>0.470703</td>
                  </tr>
                  <tr>
                    <th>std</th>
                    <td>0.790641</td>
                    <td>0.357002</td>
                    <td>0.799822</td>
                    <td>1.074441</td>
                  </tr>
                  <tr>
                    <th>min</th>
                    <td>-1.254355</td>
                    <td>-0.054235</td>
                    <td>-0.616831</td>
                    <td>-0.787686</td>
                  </tr>
                  <tr>
                    <th>25%</th>
                    <td>-0.467937</td>
                    <td>0.162174</td>
                    <td>-0.335372</td>
                    <td>-0.131335</td>
                  </tr>
                  <tr>
                    <th>50%</th>
                    <td>-0.235984</td>
                    <td>0.278024</td>
                    <td>-0.195888</td>
                    <td>0.129966</td>
                  </tr>
                  <tr>
                    <th>75%</th>
                    <td>0.532403</td>
                    <td>0.324174</td>
                    <td>0.277141</td>
                    <td>1.313379</td>
                  </tr>
                  <tr>
                    <th>max</th>
                    <td>0.690684</td>
                    <td>0.905757</td>
                    <td>1.417945</td>
                    <td>1.829192</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Gdy wartości w tabeli są wartościami nienumerycznymi, `.describe()` zwróci podstawowe statystyki tych danych takie jak ilość wartości unikalnych, ogólną ilość elementów czy wartość najczęstszą. Wynik również będzie wyliczony dla każdej z kolumn oddzielnie.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[71]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df1</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">({</span><span class="s1">&#39;not_num&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="n">np</span><span class="o">.</span><span class="n">nan</span><span class="p">,</span> <span class="s1">&#39;e&#39;</span><span class="p">]})</span>
<span class="n">df1</span><span class="o">.</span><span class="n">describe</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[71]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>not_num</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>count</th>
                    <td>4</td>
                  </tr>
                  <tr>
                    <th>unique</th>
                    <td>4</td>
                  </tr>
                  <tr>
                    <th>top</th>
                    <td>a</td>
                  </tr>
                  <tr>
                    <th>freq</th>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Gdy tabela zawiera kolumny numeryczne, jak i nienumeryczne `.describe()` z automatu wyliczy statystyki tylko dla tych zawierających wartości numeryczne. Można to zachowanie nadpisać, definiując w metodzie parametr _include='all'_. Zostaną wtedy zwrócone również statystyki dla nienumerycznych kolumn.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[72]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df1</span><span class="p">[</span><span class="s1">&#39;num&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>
<span class="n">df1</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[72]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>not_num</th>
                    <th>num</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>a</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>b</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>c</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>NaN</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>e</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[73]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df1</span><span class="o">.</span><span class="n">describe</span><span class="p">(</span><span class="n">include</span><span class="o">=</span><span class="s1">&#39;all&#39;</span><span class="p">)</span>
</pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[73]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>not_num</th>
                    <th>num</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>count</th>
                    <td>4</td>
                    <td>5.000000</td>
                  </tr>
                  <tr>
                    <th>unique</th>
                    <td>4</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>top</th>
                    <td>b</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>freq</th>
                    <td>1</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>mean</th>
                    <td>NaN</td>
                    <td>2.000000</td>
                  </tr>
                  <tr>
                    <th>std</th>
                    <td>NaN</td>
                    <td>1.581139</td>
                  </tr>
                  <tr>
                    <th>min</th>
                    <td>NaN</td>
                    <td>0.000000</td>
                  </tr>
                  <tr>
                    <th>25%</th>
                    <td>NaN</td>
                    <td>1.000000</td>
                  </tr>
                  <tr>
                    <th>50%</th>
                    <td>NaN</td>
                    <td>2.000000</td>
                  </tr>
                  <tr>
                    <th>75%</th>
                    <td>NaN</td>
                    <td>3.000000</td>
                  </tr>
                  <tr>
                    <th>max</th>
                    <td>NaN</td>
                    <td>4.000000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Apply

Metoda `.apply()` służy do aplikowania funkcji wzdłuż jednej z osi. Parametr _axis_ definiuje, czy zadana jako pierwszy parametr funkcja jest wykonywana kolumna po kolumnie, czy wiersz po wierszu.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[74]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[74]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>A   -0.735189
B    1.615894
C    0.546995
D    2.353516
dtype: float64</pre>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[75]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">,</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
</pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[75]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>0    1.992865
1    0.906598
2    1.589950
3   -0.675821
4   -0.032377
dtype: float64</pre>
          </div> </div> </div>
    </div></div>
</div>

Jako funkcję, która ma zostać wykonana, możemy przekazać metody z _NumPy_, funkcje napisane przez nas, oraz oczywiście funkcje _lambda_. Te ostatnie są chyba używane najczęściej, ze względu na prostotę zapisu i zrozumienia co robią.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[76]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="k">lambda</span> <span class="n">x</span><span class="p">:</span> <span class="n">x</span><span class="o">.</span><span class="n">max</span><span class="p">()</span> <span class="o">-</span> <span class="n">x</span><span class="o">.</span><span class="n">min</span><span class="p">())</span>
</pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[76]:</div>
          <div class="output_text output_subarea output_execute_result">
            <pre>A    1.945038
B    0.959993
C    2.034775
D    2.616878
dtype: float64</pre>
          </div> </div> </div>
    </div></div>
</div>

Pamiętajmy, że zanim zaczniemy pisać skomplikowane funkcje, które przekażemy do `.apply()`, upewnijmy się, czy w pakiecie _NumPy_ lub _Pandas_ nie ma wbudowanych funkcji robiących to samo. Będą one zapewne dużo wydajniejsze i lepiej zoptymalizowane.

## Missing data

Jak dotąd zajmowaliśmy się wyłącznie wygenerowanymi sztucznie tabelami, w których nie brakowało żadnych elementów. Taka sytuacja w realnych zbiorach danych zdarza się jednak niezmiernie rzadko. Z tego też względu bardzo ważne w dalszej pracy będzie poznanie metod radzenia sobie właśnie z brakującymi wartościami, czyli _np.NaN_.

Aby nie utrudnić czytania tego wpisu, nie będę tutaj importował dużego zbioru danych zawierającego _'missing values'_. Posłużymy się prostymi przekształceniami _Pandas_, aby nieznacznie 'popsuć' prosty, sztuczny _DataFrame_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[77]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">),</span> <span class="n">columns</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="s1">&#39;ABC&#39;</span><span class="p">))</span>
<span class="n">df</span><span class="p">[</span><span class="s1">&#39;A&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">df</span><span class="p">[</span><span class="s1">&#39;A&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">shift</span><span class="p">(</span><span class="n">periods</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span>
<span class="n">df</span><span class="o">.</span><span class="n">iat</span><span class="p">[</span><span class="mi">3</span><span class="p">,</span> <span class="mi">1</span><span class="p">]</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">nan</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[77]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>NaN</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>NaN</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>NaN</td>
                    <td>-0.091534</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Metoda, której możemy na tym etapie nie znać, to `.shift()`, która jak nazwa wskazuje, przesuwa elementy w serii o zadany parametr _periods_. Tworzy to wartości _np.NaN_ w miejscach, z których przesunięto elementy.

### Usuwanie brakujących wartości

Pierwszą z metod do radzenia sobie z _missing values_ jest `.dropna()`. Usuwa ona wiersze, w których znajdują się wartości _NaN_. Przekazując parametr _axis=1_ mówimy metodzie, aby zamiast wierszy, usuwała kolumny z brakującymi wartościami.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[78]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">dropna</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[78]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[79]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">dropna</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[79]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>-1.219446</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>-1.607528</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.425632</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.091534</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>0.335744</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Domyślnym działaniem metody jest usuwanie kolumn (wierszy), gdzie występuje chociaż jedno _NaN_, dzieje się tak, gdyż metoda domyślnie ma ustawiony parametr _how='any'_, gdy jednak zmienimy to, przekazując parametr _how='all'_ usunięte zostaną tylko kolumny (wiersze, w zależności od parametru _axis_), w których wszystkie wartości to _NaN_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[80]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="p">[</span><span class="s1">&#39;D&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">nan</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[80]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>NaN</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>NaN</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>NaN</td>
                    <td>-0.091534</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[81]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">dropna</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">how</span><span class="o">=</span><span class="s1">&#39;all&#39;</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[81]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>NaN</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>NaN</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>NaN</td>
                    <td>-0.091534</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

### Nadpisywanie brakujących wartości

Bardzo podobną metodą do `.dropna()` jest metoda `.fillna()`. W przeciwieństwie do poprzedniczki nadpisuje ona brakujące elementy zdefiniowanymi przez użytkownika wartościami.

Najprostszym sposobem użycia jest nadpisanie wszystkich wartości pojedyncza liczbą.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[82]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">fillna</span><span class="p">(</span><span class="mi">0</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[82]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.000000</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>0.000000</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>0.000000</td>
                    <td>-0.091534</td>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                    <td>0.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Możemy również zdefiniować szczególne zachowanie parametrem _method_. Gdy wpiszemy _'ffill'_ metoda uzupełni brakujące wartości prawidłowymi wartościami je poprzedzającymi - uzupełni do przodu. _'bfill'_ natomiast, uzupełni *NaN*y wartościami znajdującymi się bezpośrednio po nich - uzupełni w tył.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[83]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">fillna</span><span class="p">(</span><span class="n">method</span><span class="o">=</span><span class="s1">&#39;ffill&#39;</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[83]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>NaN</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>NaN</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>0.208549</td>
                    <td>-0.091534</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[84]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">fillna</span><span class="p">(</span><span class="n">method</span><span class="o">=</span><span class="s1">&#39;bfill&#39;</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[84]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>-0.547551</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>-0.547551</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>-0.460693</td>
                    <td>-0.091534</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.196414</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Problem może polegać na tym, że gdy np. przy parametrze _method='ffill'_ pierwszy element kolumny wynosi _NaN_, metoda nie będzie miała go czym uzupełnić, bo nic przed nim nie ma. Pozostawi więc _NaN_.

Metodzie `.fillna()` możemy również zadać limit elementów do nadpisania w każdej kolumnie.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[85]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">fillna</span><span class="p">(</span><span class="s1">&#39;?&#39;</span><span class="p">,</span> <span class="n">limit</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[85]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>?</td>
                    <td>0.552327</td>
                    <td>-1.219446</td>
                    <td>?</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>NaN</td>
                    <td>0.942665</td>
                    <td>-1.607528</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.547551</td>
                    <td>0.208549</td>
                    <td>-0.425632</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.519772</td>
                    <td>?</td>
                    <td>-0.091534</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>1.19641</td>
                    <td>-0.460693</td>
                    <td>0.335744</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Jak widzimy wyżej, wartość nadpisująca nie musi być wcale wartością numeryczną. Możemy, łącząc `.fillna()` z innymi metodami, nadpisywać brakujące wartości np. wartościami najczęściej występującymi dla danej kolumny itp.

## Grupowanie

_DataFrame_ pakietu _Pandas_ umożliwia nam grupowanie tabeli na podstawie wartości w wybranej kolumnie (bądź kilku kolumnach). Metoda `.groupby()` przyjmuje kolumnę, po której ma zostać przeprowadzone grupowanie. Dla tak pogrupowanego _DataFrame_ możemy zaaplikować np. metody statystyczne, które zostaną wyliczone oddzielnie dla każdej z grup.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[86]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">({</span><span class="s1">&#39;A&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;foo&#39;</span><span class="p">,</span> <span class="s1">&#39;bar&#39;</span><span class="p">],</span>
                   <span class="s1">&#39;B&#39;</span><span class="p">:</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">6</span><span class="p">),</span>
                   <span class="s1">&#39;C&#39;</span><span class="p">:</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">6</span><span class="p">)})</span>
<span class="n">df</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[86]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>foo</td>
                    <td>-0.712422</td>
                    <td>0.197933</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>bar</td>
                    <td>-1.389049</td>
                    <td>0.608469</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>bar</td>
                    <td>-1.672393</td>
                    <td>1.340892</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>foo</td>
                    <td>-1.902060</td>
                    <td>-0.524089</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>foo</td>
                    <td>-0.592200</td>
                    <td>-1.105602</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>bar</td>
                    <td>1.641235</td>
                    <td>-0.256648</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[87]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">groupby</span><span class="p">(</span><span class="s1">&#39;A&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">mean</span><span class="p">()</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[87]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                  <tr>
                    <th>A</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>bar</th>
                    <td>-0.473402</td>
                    <td>0.564237</td>
                  </tr>
                  <tr>
                    <th>foo</th>
                    <td>-1.068894</td>
                    <td>-0.477253</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Obiekt, który otrzymujemy z samego procesu grupowania, nie pozwala nam na wyświetlenie poszczególnych grup w bezpośredni sposób. Gdy spróbujemy wyświetlić `df.groupby(df['A'])` otrzymamy `<pandas.core.groupby.generic.DataFrameGroupBy object at 0x7f2e48565e50&gt;`. Aby pobrać określoną grupę, czyli wiersze jej odpowiadające, musimy zastosować metodę `.get_group()`.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[88]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">groupby</span><span class="p">(</span><span class="s1">&#39;A&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">get_group</span><span class="p">(</span><span class="s1">&#39;foo&#39;</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[88]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>foo</td>
                    <td>-0.712422</td>
                    <td>0.197933</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>foo</td>
                    <td>-1.902060</td>
                    <td>-0.524089</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>foo</td>
                    <td>-0.592200</td>
                    <td>-1.105602</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

## Łączenie tabel

Ostatnim tematem, który chciałbym poruszyć w tym wpisie, jest łączenie tablic. Często będzie się zdarzało, że problem będzie wymagał rozdzielania, przekształceń i ponownego łączenia ze sobą zbiorów danych. _Pandas_ udostępnia nam do tego dwie bardzo użyteczne metody, pozwalające na spajanie ze sobą tabel, na bardzo wiele konfigurowalnych sposobów. Różnią się one zamysłem, na podstawie którego łączą zbiory.

### Metoda .concat()

W podstawowym zastosowaniu metody `.concat()` przekazujemy do niej listę _DataFrames_, które mają zostać ze sobą połączone. Domyślnie zbiory zostaną złączone vertykalnie, czyli drugi poniżej pierwszego.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[89]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">df1</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">4</span><span class="p">,</span><span class="mi">4</span><span class="p">))</span>
<span class="n">df2</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="mi">4</span><span class="p">,</span><span class="mi">4</span><span class="p">))</span>
<span class="n">pd</span><span class="o">.</span><span class="n">concat</span><span class="p">([</span><span class="n">df1</span><span class="p">,</span> <span class="n">df2</span><span class="p">])</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[89]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.203264</td>
                    <td>0.149827</td>
                    <td>-0.430527</td>
                    <td>-0.738968</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>1.445423</td>
                    <td>-1.394058</td>
                    <td>0.100795</td>
                    <td>-1.327643</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.680555</td>
                    <td>0.051062</td>
                    <td>0.030236</td>
                    <td>0.844866</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.666290</td>
                    <td>0.273346</td>
                    <td>2.364498</td>
                    <td>-1.628630</td>
                  </tr>
                  <tr>
                    <th>0</th>
                    <td>-0.152519</td>
                    <td>-0.003016</td>
                    <td>-0.232511</td>
                    <td>-1.000228</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>2.729718</td>
                    <td>-0.249056</td>
                    <td>-1.895550</td>
                    <td>1.315563</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>2.323606</td>
                    <td>1.622645</td>
                    <td>2.364899</td>
                    <td>-0.191765</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>-0.595703</td>
                    <td>-0.449733</td>
                    <td>0.490235</td>
                    <td>-1.384348</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Jak widzimy, takie proste zastosowanie spowodowało, że nawet po połączeniu oba zbiory zachowały swoje pierwotne indeksy. Aby temu zapobiec, musimy do metody `.concat()` przekazać parametr _ignore_index=**True**_. Spowoduje on zresetowanie indeksów w wynikowym _DataFrame_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[90]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">concat</span><span class="p">([</span><span class="n">df1</span><span class="p">,</span> <span class="n">df2</span><span class="p">],</span> <span class="n">ignore_index</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[90]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.203264</td>
                    <td>0.149827</td>
                    <td>-0.430527</td>
                    <td>-0.738968</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>1.445423</td>
                    <td>-1.394058</td>
                    <td>0.100795</td>
                    <td>-1.327643</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.680555</td>
                    <td>0.051062</td>
                    <td>0.030236</td>
                    <td>0.844866</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.666290</td>
                    <td>0.273346</td>
                    <td>2.364498</td>
                    <td>-1.628630</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>-0.152519</td>
                    <td>-0.003016</td>
                    <td>-0.232511</td>
                    <td>-1.000228</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>2.729718</td>
                    <td>-0.249056</td>
                    <td>-1.895550</td>
                    <td>1.315563</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>2.323606</td>
                    <td>1.622645</td>
                    <td>2.364899</td>
                    <td>-0.191765</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>-0.595703</td>
                    <td>-0.449733</td>
                    <td>0.490235</td>
                    <td>-1.384348</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

Możemy również sterować sposobem łączenia ze sobą zbiorów. Gdy chcemy, aby zostały one połączone horyzontalnie, wystarczy przekazać do metody parametr _axis=1_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[91]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">concat</span><span class="p">([</span><span class="n">df1</span><span class="p">,</span> <span class="n">df2</span><span class="p">],</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">ignore_index</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[91]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>0.203264</td>
                    <td>0.149827</td>
                    <td>-0.430527</td>
                    <td>-0.738968</td>
                    <td>-0.152519</td>
                    <td>-0.003016</td>
                    <td>-0.232511</td>
                    <td>-1.000228</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>1.445423</td>
                    <td>-1.394058</td>
                    <td>0.100795</td>
                    <td>-1.327643</td>
                    <td>2.729718</td>
                    <td>-0.249056</td>
                    <td>-1.895550</td>
                    <td>1.315563</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>-0.680555</td>
                    <td>0.051062</td>
                    <td>0.030236</td>
                    <td>0.844866</td>
                    <td>2.323606</td>
                    <td>1.622645</td>
                    <td>2.364899</td>
                    <td>-0.191765</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0.666290</td>
                    <td>0.273346</td>
                    <td>2.364498</td>
                    <td>-1.628630</td>
                    <td>-0.595703</td>
                    <td>-0.449733</td>
                    <td>0.490235</td>
                    <td>-1.384348</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> </div> </div>
    </div></div>
</div>

### Metoda .join()

W metodzie `.join()` dla odróżnienia, stosowane jest bardziej podejście _SQL-owe_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[92]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">left</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">({</span><span class="s1">&#39;key&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;K1&#39;</span><span class="p">,</span> <span class="s1">&#39;K2&#39;</span><span class="p">,</span> <span class="s1">&#39;K3&#39;</span><span class="p">],</span>
                       <span class="s1">&#39;A&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;A1&#39;</span><span class="p">,</span> <span class="s1">&#39;A2&#39;</span><span class="p">,</span> <span class="s1">&#39;A3&#39;</span><span class="p">]})</span>
<span class="n">left</span></pre></div> </div>
      </div>
    </div> <div class="output_wrapper">
      <div class="output">
        <div class="output_area"> <div class="prompt output_prompt">Out[92]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>key</th>
                    <th>A</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>K1</td>
                    <td>A1</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>K2</td>
                    <td>A2</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>K3</td>
                    <td>A3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[93]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">right</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">({</span><span class="s1">&#39;key&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;K0&#39;</span><span class="p">,</span> <span class="s1">&#39;K1&#39;</span><span class="p">,</span> <span class="s1">&#39;K2&#39;</span><span class="p">],</span>
                        <span class="s1">&#39;B&#39;</span><span class="p">:</span> <span class="p">[</span><span class="s1">&#39;B0&#39;</span><span class="p">,</span> <span class="s1">&#39;B1&#39;</span><span class="p">,</span> <span class="s1">&#39;B2&#39;</span><span class="p">]})</span>
<span class="n">right</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[93]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>key</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>K0</td>
                    <td>B0</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>K1</td>
                    <td>B1</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>K2</td>
                    <td>B2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Gdy posiadamy dwa zbiory danych, które mają wspólną kolumną, możemy połączyć je za pomocą metody `.join()`, definiując w parametrze _on_, według której kolumny przeprowadzić łączenie.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[94]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">merge</span><span class="p">(</span><span class="n">left</span><span class="p">,</span> <span class="n">right</span><span class="p">,</span> <span class="n">on</span><span class="o">=</span><span class="s1">&#39;key&#39;</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[94]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>key</th>
                    <th>A</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>K1</td>
                    <td>A1</td>
                    <td>B1</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>K2</td>
                    <td>A2</td>
                    <td>B2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

Metoda posiada domyślny parametr _how='inner'_, co, dla nieznających _SQL_, oznacza, że do połączenia wykorzystane zostaną tylko te wiersze, które występują w obu łączonych tabelach.

Gdy zmienimy manualnie wartość parametru _how_ na _'outer'_, po połączeniu uzyskamy zbiór zawierający wszystkie wiersze występujące w obu zbiorach. Miejsca z brakującymi danymi zostaną uzupełnione wartościami _np.NaN_.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[95]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">merge</span><span class="p">(</span><span class="n">left</span><span class="p">,</span> <span class="n">right</span><span class="p">,</span> <span class="n">how</span><span class="o">=</span><span class="s1">&#39;outer&#39;</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[95]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>key</th>
                    <th>A</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>K1</td>
                    <td>A1</td>
                    <td>B1</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>K2</td>
                    <td>A2</td>
                    <td>B2</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>K3</td>
                    <td>A3</td>
                    <td>NaN</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>K0</td>
                    <td>NaN</td>
                    <td>B0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

W parametrze _how_ możemy też określić, na podstawie której tabeli przeprowadzić łączeni. _'left'_ mówi, żeby do łączenia wziąć tylko te kolumny występujące w 'lewym' zbiorze danych. Niezależnie co znajduje się w 'prawym'.

Po więcej informacji jak działa _JOIN_ w _SQL_ odsyłam do mojego wcześniejszego wpisu: [Podstawy SQL na przykładzie MySQL](https://www.amazeddeveloper.pl/blog/mysql-basics/) oraz do dokumentacji.

<div class="jupyter">
  <div class="cell border-box-sizing code_cell rendered">
    <div class="input">
      <div class="prompt input_prompt">In&nbsp;[96]:</div>
      <div class="inner_cell">
        <div class="input_area">
          <div class="highlight hl-ipython3"><pre><span></span><span class="n">pd</span><span class="o">.</span><span class="n">merge</span><span class="p">(</span><span class="n">left</span><span class="p">,</span> <span class="n">right</span><span class="p">,</span> <span class="n">how</span><span class="o">=</span><span class="s1">&#39;left&#39;</span><span class="p">)</span></pre></div>
        </div>
      </div>
    </div>
    <div class="output_wrapper">
      <div class="output">
        <div class="output_area">
          <div class="prompt output_prompt">Out[96]:</div>
          <div class="output_html rendered_html output_subarea
            output_execute_result">
            <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style="text-align: right;">
                    <th></th>
                    <th>key</th>
                    <th>A</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>0</th>
                    <td>K1</td>
                    <td>A1</td>
                    <td>B1</td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>K2</td>
                    <td>A2</td>
                    <td>B2</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>K3</td>
                    <td>A3</td>
                    <td>NaN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Podsumowanie

Teraz znamy już podstawy pracy z _Pandas_. Omówiliśmy zagadnienia związane z indeksowaniem, nadpisywaniem, wybieraniem, czy grupowaniem tablic. Wiemy jak radzić sobie z brakującymi wartościami, jak łączyć tablice, oraz jak otrzymać informacje o tym, co znajduje się w _DataFrame_. Wiedza ta pozwoli nam poznawać kolejne narzędzia _Pythona_ służące przetwarzaniu i analizie danych oraz rozpocząć zabawę ze sztuczną inteligencją, co jest głównym celem całego cyklu wpisów.

Jeśli chodzi o _Pandas_ w najbliższym czasie pojawią się jeszcze dwa wpisy bezpośrednio odnoszące się do pakietu. Omówimy w nich bardziej zaawansowane koncepcje oraz przykład wykonania analizy danych (_EDA_).
