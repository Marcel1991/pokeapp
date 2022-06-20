import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { HttpClientModule} from "@angular/common/http";
import { FormBuilder } from '@angular/forms';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        FormBuilder
      ],
      declarations: [ PokemonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe habilitarse formulario al presionar boton Nuevo', () => {
    const compiled = fixture.nativeElement;
    compiled.querySelector('.addPokemon').click()
    expect(component.showCreateUpdateForm).toBeTrue()
  });
});
