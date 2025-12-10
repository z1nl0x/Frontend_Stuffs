// src/components/screens/404.tsx
import { Head } from "~/components/shared/Head";
import { useNavigate } from 'react-router-dom'; // 1. Importe useNavigate

function Page404() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <Head title={'Página não encontrada'}></Head>
      <div className="hero min-h-screen bg-gray-800">
        <div className="text-center hero-content text-3xl font-bold">
          <div>
            <h1 className="text-white">
              404 PÁGINA NÃO ENCONTRADA
            </h1>
            <div className='mt-4'>
              <button 
                onClick={handleGoBack} 
                className="btn btn-outline btn-error btn-lg text-white normal-case" 
              >
                VOLTAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page404;