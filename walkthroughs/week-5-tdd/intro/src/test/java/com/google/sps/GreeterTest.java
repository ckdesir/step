// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public final class GreeterTest {

  private Greeter greeter;

  @Before
  public void setUp() {
    greeter = new Greeter();
  }

  @Test
  public void testGreeting() {
    String actualGreeting = greeter.greet("No");
    String expectedGreeting = "Hello No";
    assertEquals(expectedGreeting, actualGreeting);
  }

  @Test
  public void testGreetingTrimsWhitespace() {
    String actualGreeting = greeter.greet("   rebase   ");
    String expectedGreeting = "Hello rebase";
    assertEquals(expectedGreeting, actualGreeting);
  }

  @Test
  public void testGreetingWithSymbols() {
    String actualGreeting = greeter.greet("%i");
    String expectedGreeting = "Hello i";
    assertEquals(expectedGreeting, actualGreeting);
  }
}
